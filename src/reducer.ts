import { enableMapSet, produce } from "immer";

import * as action from "./action";
import { CHANGE_VOICE } from "./action";
import * as dependency from "./dependency";
import * as i18n from "./i18n";
import * as question from "./question";
import * as speech from "./speech";

enableMapSet(); //  See https://immerjs.github.io/immer/docs/installation#pick-your-immer-version

export interface State {
  readonly language: i18n.LanguageID;
  readonly voice: speech.VoiceID | undefined;
  readonly lastVoiceByLanguage: Map<
    i18n.LanguageID,
    speech.VoiceID | undefined
  >;
  readonly currentQuestion: question.ID;
  readonly answers: Map<question.ID, string>;
  readonly focusPending: boolean;
  readonly preferencesVisible: boolean;
}

export function initializeState(deps: dependency.Registry): State {
  if (deps.questionBank.questions.length === 0) {
    throw Error("Unexpected empty question bank.");
  }

  if (deps.translations.size === 0) {
    throw Error("Unexpected empty translations.");
  }

  const langs: i18n.LanguageID[] = [...deps.translations.keys()].sort();
  const language = langs[0];

  const lastVoiceByLanguage = new Map<
    i18n.LanguageID,
    speech.VoiceID | undefined
  >();
  for (const [lang, voices] of deps.voicesByLanguage.entries()) {
    if (voices.length > 0) {
      lastVoiceByLanguage.set(lang, voices[0]);
    } else {
      lastVoiceByLanguage.set(lang, undefined);
    }
  }

  const voice = lastVoiceByLanguage.get(language);

  return {
    language,
    voice,
    lastVoiceByLanguage,
    currentQuestion: deps.questionBank.questions[0].id,
    answers: new Map<question.ID, string>(),
    focusPending: true,
    preferencesVisible: true,
  };
}

export function create(deps: dependency.Registry) {
  const initialState = initializeState(deps);

  const reducer = (state: State = initialState, a: action.Action): State => {
    const result = produce(state, (draft) => {
      switch (a.type) {
        case action.CHANGE_ANSWER:
          draft.answers.set(state.currentQuestion, a.answer);
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
          if (state.language !== a.language) {
            draft.language = a.language;
            draft.voice = state.lastVoiceByLanguage.get(a.language);
            console.log(draft.voice);
          }
          break;
        case CHANGE_VOICE:
          draft.voice = a.voice;
          draft.lastVoiceByLanguage.set(state.language, a.voice);
          break;
      }
    });

    return result;
  };

  return reducer;
}
