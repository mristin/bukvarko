import deepEqual from 'deep-equal';
import { enableMapSet, produce } from 'immer';

import * as action from './action';
import * as autosave from './autosave';
import * as dependency from './dependency';
import * as i18n from './i18n';
import * as question from './question';
import * as speech from './speech';

enableMapSet(); //  See https://immerjs.github.io/immer/docs/installation#pick-your-immer-version

export interface State {
  readonly language: i18n.LanguageID;
  readonly voiceByLanguage: Map<i18n.LanguageID, speech.VoiceID | undefined>;
  readonly currentQuestion: question.ID;
  readonly answers: Map<question.ID, string>;
  readonly focusPending: boolean;
  readonly preferencesVisible: boolean;
}

export function initializeState(deps: dependency.Registry): State {
  if (deps.questionBank.questions.length === 0) {
    throw Error('Unexpected empty question bank.');
  }

  if (deps.translations.size === 0) {
    throw Error('Unexpected empty translations.');
  }

  const language = i18n.inferDefault(navigator.language || '', [...deps.translations.keys()].sort());

  const voiceByLanguage = new Map<i18n.LanguageID, speech.VoiceID | undefined>();
  for (const [lang, voices] of deps.voicesByLanguage.entries()) {
    if (voices.length > 0) {
      voiceByLanguage.set(lang, voices[0]);
    } else {
      voiceByLanguage.set(lang, undefined);
    }
  }

  const defaultState: State = {
    language,
    voiceByLanguage,
    currentQuestion: deps.questionBank.questions[0].id,
    answers: new Map<question.ID, string>(),
    focusPending: true,
    preferencesVisible: true,
  };

  const state = autosave.patchState(deps, defaultState);

  if (deps.storage.length === 0 && !deepEqual(defaultState, state)) {
    throw Error(
      'The default state and the state patched by the storage are not equal, ' +
        'but there was nothing in the storage.',
    );
  }

  return state;
}

export function createReducer(deps: dependency.Registry) {
  const initialState = initializeState(deps);

  const reducer = (state: State = initialState, a: action.Action): State => {
    const result = produce(state, (draft) => {
      switch (a.type) {
        case action.CHANGE_ANSWER:
          draft.answers.set(a.questionID, a.answer);
          break;
        case action.GOTO_QUESTION:
          draft.currentQuestion = a.questionID;
          break;
        case action.ASK_TO_REFOCUS:
          draft.focusPending = true;
          break;
        case action.ACK_REFOCUS:
          draft.focusPending = false;
          break;
        case action.TOGGLE_PREFERENCES:
          draft.preferencesVisible = a.value;
          break;
        case action.CHANGE_TRANSLATION:
          draft.language = a.language;
          break;
        case action.CHANGE_VOICE:
          draft.voiceByLanguage.set(a.language, a.voice);
          break;
        case action.DELETE_ALL:
          draft.answers.clear();
          break;
      }
    });

    return result;
  };

  return reducer;
}
