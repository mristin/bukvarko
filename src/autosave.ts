import { produce } from "immer";
import { Dispatch, Middleware, MiddlewareAPI } from "redux";

import * as action from "./action";
import * as app from "./app";
import * as dependency from "./dependency";
import * as i18n from "./i18n";
import * as question from "./question";
import * as speech from "./speech";
import * as stateInvariants from "./stateInvariants";

/**
 * Patch the initialized state with the extra information from the storage.
 */
export function patchState(
  deps: dependency.Registry,
  state: app.State
): app.State {
  // Precondition
  stateInvariants.verify(state, deps);

  const result = produce(state, (draft) => {
    ////
    // Language and voice
    ////

    const maybeLanguage = deps.storage.getItem("language");

    if (
      maybeLanguage !== null &&
      deps.translations.has(maybeLanguage as i18n.LanguageID)
    ) {
      const language = maybeLanguage as i18n.LanguageID;

      draft.language = language;

      const voiceIDAsKey = deps.storage.getItem("voice");
      if (voiceIDAsKey !== null) {
        const voice = speech.voiceIDFromKey(voiceIDAsKey);

        if (speech.voiceForLanguageOK(voice, language, deps.voicesByLanguage)) {
          draft.voice = voice;
        }
      } else {
        draft.voice = state.lastVoiceByLanguage.get(language);
      }
    }

    for (const language of deps.translations.keys()) {
      const storageKey = `lastVoiceByLanguage/${language}`;
      const maybeLastVoiceKey = deps.storage.getItem(storageKey);
      if (maybeLastVoiceKey !== null && maybeLastVoiceKey !== undefined) {
        const voice = speech.voiceIDFromKey(maybeLastVoiceKey);

        if (speech.voiceForLanguageOK(voice, language, deps.voicesByLanguage)) {
          draft.lastVoiceByLanguage.set(language, voice);
        }
      }
    }

    ////
    // Question & answers
    ////

    for (const question of deps.questionBank.questions) {
      const maybeAnswer = deps.storage.getItem(`answer/${question.id}`);

      if (maybeAnswer !== null && maybeAnswer !== undefined) {
        draft.answers.set(question.id, maybeAnswer);
      }
    }

    const maybeCurrentQuestion = deps.storage.getItem("currentQuestion");
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

    const maybePreferencesVisible = deps.storage.getItem("preferencesVisible");
    if (
      maybePreferencesVisible === null ||
      maybePreferencesVisible === undefined
    ) {
      draft.preferencesVisible = false;
    } else {
      draft.preferencesVisible = maybePreferencesVisible === "true";
    }
  });

  stateInvariants.verify(state, deps);

  return result;
}

export function create(deps: dependency.Registry) {
  const middleware: Middleware = (api: MiddlewareAPI<Dispatch, app.State>) => (
    next: Dispatch
  ) => (a: action.Action) => {
    const result = next(a);

    switch (a.type) {
      case action.CHANGE_TRANSLATION: {
        deps.storage.setItem("language", api.getState().language);

        const voice = api.getState().voice;
        if (voice !== undefined) {
          deps.storage.setItem("voice", voice.toKey());
        }
        break;
      }

      case action.CHANGE_VOICE: {
        const voice = api.getState().voice;
        if (voice !== undefined) {
          const language = api.getState().language;

          // The language needs to be set as well in order to retrieve the voice afterwards.
          // This is relevant when you have an initial storage where no language has been stored.
          const maybeLanguage = deps.storage.getItem("language");
          if (maybeLanguage === null || maybeLanguage === undefined) {
            deps.storage.setItem("language", language);
          } else {
            if (maybeLanguage !== api.getState().language) {
              throw Error(
                `Expected the language in the storage (== ${maybeLanguage}) to coincide ` +
                  `with the language in the state on voice change: ${
                    api.getState().language
                  }`
              );
            }
          }

          deps.storage.setItem("voice", voice.toKey());

          deps.storage.setItem(
            `lastVoiceByLanguage/${language}`,
            api.getState().lastVoiceByLanguage.get(language)!.toKey()
          );
        } else {
          deps.storage.removeItem("voice");
        }
        break;
      }

      case action.CHANGE_ANSWER: {
        const question = api.getState().currentQuestion;
        const answer = api.getState().answers.get(question);
        if (answer === undefined) {
          throw Error(`Unexpectedly no answer for the question: ${question}`);
        }

        deps.storage.setItem(`answer/${question}`, answer);
        break;
      }

      case action.GOTO_QUESTION: {
        const currentQuestion = api.getState().currentQuestion;
        deps.storage.setItem("currentQuestion", currentQuestion);
        break;
      }

      case action.TOGGLE_PREFERENCES: {
        deps.storage.setItem(
          "preferencesVisible",
          api.getState().preferencesVisible ? "true" : "false"
        );
      }
    }

    return result;
  };

  return middleware;
}
