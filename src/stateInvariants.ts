import { Action, Dispatch, Middleware, MiddlewareAPI } from "redux";

import { QuestionBank } from "./QuestionBank";
import { State } from "./reducers";

export function create(questionBank: QuestionBank) {
  const middleware: Middleware = (api: MiddlewareAPI<Dispatch, State>) => (
    next: Dispatch
  ) => (action: Action) => {
    // Verify before dispatching
    verify(api.getState(), questionBank);

    const result = next(action);

    // Verify after reducing
    verify(api.getState(), questionBank);

    return result;
  };

  return middleware;
}

function verify(state: State, questionBank: QuestionBank) {
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
