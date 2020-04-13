import { Action, Dispatch, Middleware, MiddlewareAPI } from "redux";

import * as dependency from "./dependency";
import * as reducer from "./reducer";

export function create(deps: dependency.Registry) {
  const middleware: Middleware = (
    api: MiddlewareAPI<Dispatch, reducer.State>
  ) => (next: Dispatch) => (action: Action) => {
    // Verify before dispatching
    verify(api.getState(), deps);

    const result = next(action);

    // Verify after reducing
    verify(api.getState(), deps);

    return result;
  };

  return middleware;
}

export function verify(state: reducer.State, deps: dependency.Registry) {
  if (!deps.translations.has(state.language)) {
    throw Error(
      `Language in the state is not contained in the translations: ${JSON.stringify(
        state.language
      )}`
    );
  }

  if (state.voice !== undefined) {
    if (!deps.voices.has(state.voice)) {
      throw Error(
        `Voice in the state is not available in the voices: (${JSON.stringify(
          state.voice
        )}`
      );
    }

    let voiceMatchesTranslation = false;
    for (const voice of deps.voicesByLanguage.get(state.language)!) {
      if (voice.toKey() === state.voice.toKey()) {
        voiceMatchesTranslation = true;
      }
    }
    if (!voiceMatchesTranslation) {
      throw Error(
        `Voice in the state does not match the language in the state ${state.language}: ${state.voice}`
      );
    }
  }

  if (!deps.questionBank.has(state.currentQuestion)) {
    throw Error(
      `Current question is not in the question bank: ${state.currentQuestion}`
    );
  }

  for (const id of state.answers.keys()) {
    if (!deps.questionBank.has(id)) {
      throw Error(`Answer is given to a question with invalid ID: ${id}`);
    }
  }
}
