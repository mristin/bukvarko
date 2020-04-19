import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux';

import * as app from './app';
import * as dependency from './dependency';
import * as speech from './speech';

export function verify(state: app.State, deps: dependency.Registry) {
  if (!deps.translations.has(state.language)) {
    throw Error(`Language in the state is not contained in the translations: ${JSON.stringify(state.language)}`);
  }

  for (const language of deps.translations.keys()) {
    if (!state.voiceByLanguage.has(language)) {
      throw Error(`Unexpectedly missing an entry in the state of voiceByLanguage for the language: ${language}`);
    }

    const voice = state.voiceByLanguage.get(language);
    if (voice !== undefined && !speech.voiceForLanguageOK(voice, language, deps.voicesByLanguage)) {
      throw Error(`The state of voiceByLanguage for the language ${language} is invalid: ${voice}`);
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
