import { produce } from 'immer';
import { Dispatch, Middleware, MiddlewareAPI, Store } from 'redux';

import * as action from './action';
import * as app from './app';
import * as dependency from './dependency';
import * as i18n from './i18n';
import * as question from './question';
import * as speech from './speech';
import * as stateInvariants from './stateInvariants';

function saveVoice(storage: Storage, language: i18n.LanguageID, voice: speech.VoiceID | undefined) {
  const key = `voiceByLanguage/${language}`;
  if (voice !== undefined) {
    storage.setItem(key, voice.toKey());
  }
}

function loadVoice(storage: Storage, language: i18n.LanguageID): speech.VoiceID | undefined {
  const key = `voiceByLanguage/${language}`;
  const voice = storage.getItem(key);
  if (voice === null || voice === undefined) {
    return undefined;
  }
  return speech.voiceIDFromKey(voice);
}

function saveAnswer(storage: Storage, questionID: question.ID, answer: string) {
  const key = `answer/${questionID}`;
  if (answer === '') {
    storage.removeItem(key);
  } else {
    storage.setItem(key, answer);
  }
}

function loadAnswer(storage: Storage, questionID: question.ID): string | undefined {
  const key = `answer/${questionID}`;
  const value = storage.getItem(key);
  if (value === undefined || value === null) {
    return undefined;
  }
  return value;
}

export function undoPreviousDataVersions(storage: Storage) {
  storage.removeItem('voice');

  for (let i = 0; i < storage.lenght; i++) {
    const key = storage.key(i);
    if (key !== undefined && key !== null && key.startsWith('lastVoiceByLanguage')) {
      storage.removeItem(key);
    }
  }
}

export function connectStoreToStorageEvent(store: Store<app.State, action.Action>, deps: dependency.Registry) {
  window.onstorage = (e: StorageEvent) => {
    if (e.newValue === e.oldValue) {
      return;
    }

    if (e.key === undefined || e.key === null) {
      return;
    }

    if (e.newValue === undefined || e.newValue === null) {
      return;
    }

    if (e.key === 'language') {
      const language = e.newValue;
      if (deps.translations.has(language as i18n.LanguageID)) {
        store.dispatch(action.changeTranslation(language as i18n.LanguageID));
      }
    } else if (e.key.startsWith('voiceByLanguage/')) {
      const parts = e.key.split('/');
      if (parts.length !== 2) {
        throw Error(`Unexpected split on the key (expected exactly 2 parts, got: ${parts.length}): ${e.key}`);
      }

      const language = parts[1];
      if (deps.translations.has(language as i18n.LanguageID)) {
        if (e.newValue !== null && e.newValue !== undefined) {
          const voice = speech.voiceIDFromKey(e.newValue);

          store.dispatch(action.changeVoice(language as i18n.LanguageID, voice));
        }
      }
    } else if (e.key.startsWith('answer/')) {
      const parts = e.key.split('/');
      if (parts.length !== 2) {
        throw Error(`Unexpected split on the key (expected exactly 2 parts, got: ${parts.length}): ${e.key}`);
      }

      const questionID = parts[1];
      if (deps.questionBank.has(questionID as question.ID)) {
        store.dispatch(action.changeAnswer(questionID as question.ID, e.newValue));
      }
    } else if (e.key === 'currentQuestion') {
      if (deps.questionBank.has(e.newValue as question.ID)) {
        store.dispatch(action.gotoQuestion(e.newValue as question.ID));
      }
    } else if (e.key === 'preferencesVisible') {
      store.dispatch(action.togglePreferences(e.newValue === 'true'));
    } else {
      throw new Error(`Unhandled storage key from the storage event: ${e.key}`);
    }
  };
}

/**
 * Patch the initialized state with the extra information from the storage.
 */
export function patchState(deps: dependency.Registry, state: app.State): app.State {
  // Precondition
  stateInvariants.verify(state, deps);

  const result = produce(state, (draft) => {
    ////
    // Language and voices
    ////

    const maybeLanguage = deps.storage.getItem('language');
    if (maybeLanguage !== null && deps.translations.has(maybeLanguage as i18n.LanguageID)) {
      draft.language = maybeLanguage as i18n.LanguageID;
    }

    for (const aLanguage of deps.voicesByLanguage.keys()) {
      const voice = loadVoice(deps.storage, aLanguage);
      if (voice !== undefined && speech.voiceForLanguageOK(voice, aLanguage, deps.voicesByLanguage)) {
        draft.voiceByLanguage.set(aLanguage, voice);
      }
    }

    ////
    // Question & answers
    ////

    for (const question of deps.questionBank.questions) {
      const answer = loadAnswer(deps.storage, question.id);
      if (answer !== undefined) {
        draft.answers.set(question.id, answer);
      }
    }

    const maybeCurrentQuestion = deps.storage.getItem('currentQuestion');
    if (
      maybeCurrentQuestion !== null &&
      maybeCurrentQuestion !== undefined &&
      deps.questionBank.has(maybeCurrentQuestion as question.ID)
    ) {
      draft.currentQuestion = maybeCurrentQuestion as question.ID;
    }

    ////
    // Preferences visible
    ////

    const maybePreferencesVisible = deps.storage.getItem('preferencesVisible');
    if (maybePreferencesVisible !== null && maybePreferencesVisible !== undefined) {
      draft.preferencesVisible = maybePreferencesVisible === 'true';
    }
  });

  // Postcondition
  stateInvariants.verify(result, deps);

  return result;
}

export function create(deps: dependency.Registry): Middleware {
  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  const middleware: Middleware = (api: MiddlewareAPI<Dispatch, app.State>) => (next: Dispatch) => (
    a: action.Action,
  ) => {
    const result = next(a);

    switch (a.type) {
      case action.CHANGE_TRANSLATION: {
        deps.storage.setItem('language', a.language);
        break;
      }

      case action.CHANGE_VOICE: {
        saveVoice(deps.storage, a.language, a.voice);
        break;
      }

      case action.CHANGE_ANSWER: {
        saveAnswer(deps.storage, a.questionID, a.answer);
        break;
      }

      case action.DELETE_ALL: {
        for (const question of deps.questionBank.questions) {
          deps.storage.removeItem(`answer/${question.id}`);
        }
        break;
      }

      case action.GOTO_QUESTION: {
        deps.storage.setItem('currentQuestion', a.questionID);
        break;
      }

      case action.TOGGLE_PREFERENCES: {
        deps.storage.setItem('preferencesVisible', api.getState().preferencesVisible ? 'true' : 'false');
      }
    }

    return result;
  };

  return middleware;
}
