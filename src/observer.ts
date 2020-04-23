import { Dispatch, Middleware, MiddlewareAPI } from 'redux';

import * as action from './action';
import * as app from './app';
import * as dependency from './dependency';
import * as effect from './effect';

/**
 * Observe the state changes and dispatch effects based on them.
 */

export function create(deps: dependency.Registry): Middleware {
  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  const middleware: Middleware = (api: MiddlewareAPI<Dispatch, app.State>) => (next: Dispatch) => (
    a: action.Action,
  ) => {
    const result = next(a);

    // Prepare the sound for the current question
    if (a.type === action.GOTO_QUESTION) {
      api.dispatch(effect.pauseSound() as any);
      api.dispatch(effect.setSound() as any);
    }

    // Play a sound on the correct answer.
    if (a.type === action.CHANGE_ANSWER) {
      const state = api.getState();
      const answer = state.answers.get(state.currentQuestion);

      if (answer !== undefined) {
        const translation = deps.translations.get(state.language);
        if (translation === undefined) {
          throw Error(`Unexpectedly no translation for the language in the state: ${state.language}`);
        }

        const checker = translation.answerCheckers[state.currentQuestion];
        if (checker(answer)) {
          api.dispatch(effect.playSound() as any);
        }
      }
    }

    return result;
  };

  return middleware;
}
