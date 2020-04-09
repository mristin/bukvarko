import { Action, Dispatch, Middleware, MiddlewareAPI } from "redux";

import * as question from "./question";
import * as reducer from "./reducer";

export function create(questionBank: question.Bank) {
  const middleware: Middleware = (
    api: MiddlewareAPI<Dispatch, reducer.State>
  ) => (next: Dispatch) => (action: Action) => {
    // Verify before dispatching
    verify(api.getState(), questionBank);

    const result = next(action);

    // Verify after reducing
    verify(api.getState(), questionBank);

    return result;
  };

  return middleware;
}

function verify(state: reducer.State, questionBank: question.Bank) {
  if (!questionBank.has(state.currentQuestion)) {
    throw Error(
      `Current question is not in the question bank: ${state.currentQuestion}`
    );
  }

  for (const id of state.answers.keys()) {
    if (!questionBank.has(id)) {
      throw Error(`Answer is given to a question with invalid ID: ${id}`);
    }
  }
}
