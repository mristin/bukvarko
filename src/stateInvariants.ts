import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux';

import * as app from './app';
import * as dependency from './dependency';
import * as speech from './speech';

export function verify(state: app.State, deps: dependency.Registry) {
  if (!deps.translations.has(state.language)) {
    throw Error(`Language in the state is not contained in the translations: ${JSON.stringify(state.language)}`);
  }

  if (state.voice !== undefined) {
    if (!deps.voices.has(state.voice)) {
      throw Error(`Voice in the state is not available in the voices: (${JSON.stringify(state.voice)}`);
    }

    const lastVoice = state.lastVoiceByLanguage.get(state.language);
    if (lastVoice === undefined) {
      throw Error(`Unexpected undefined last voice for the language in the state: ${state.language}`);
    }

    if (lastVoice.toKey() !== state.voice.toKey()) {
      throw Error(
        `The voice in the state (== ${state.voice.toKey()}) for the language ${state.language} ` +
          `must match the last voice by the same language: ${lastVoice.toKey()}`,
      );
    }

    if (!speech.voiceForLanguageOK(state.voice, state.language, deps.voicesByLanguage)) {
      throw Error(`Voice in the state does not match the language in the state ${state.language}: ${state.voice}`);
    }
  }

  for (const language of deps.translations.keys()) {
    if (!state.lastVoiceByLanguage.has(language)) {
      throw Error(`Unexpectedly missing an entry in lastVoiceByLanguage for: ${language}`);
    }

    const lastVoice = state.lastVoiceByLanguage.get(language);
    if (lastVoice !== undefined && !speech.voiceForLanguageOK(lastVoice, language, deps.voicesByLanguage)) {
      throw Error(`The lastvoiceByLanguage for the language ${language} is invalid: ${lastVoice}`);
    }
  }

  if (!deps.questionBank.has(state.currentQuestion)) {
    throw Error(`Current question is not in the question bank: ${state.currentQuestion}`);
  }

  for (const id of state.answers.keys()) {
    if (!deps.questionBank.has(id)) {
      throw Error(`Answer is given to a question with invalid ID: ${id}`);
    }
  }
}

export function create(deps: dependency.Registry) {
  const middleware: Middleware = (api: MiddlewareAPI<Dispatch, app.State>) => (next: Dispatch) => (action: Action) => {
    // Verify before dispatching
    verify(api.getState(), deps);

    const result = next(action);

    // Verify after reducing
    verify(api.getState(), deps);

    return result;
  };

  return middleware;
}
