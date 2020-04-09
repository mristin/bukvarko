import { enableMapSet, produce } from "immer";

import * as action from "./action";
import * as dependency from "./dependency";
import * as question from "./question";

enableMapSet(); //  See https://immerjs.github.io/immer/docs/installation#pick-your-immer-version

export interface State {
  readonly currentQuestion: question.ID;
  readonly answers: Map<question.ID, string>;
  readonly focusPending: boolean;
}

export function initializeState(deps: dependency.Register) {
  return {
    currentQuestion: deps.questionBank.questions[0].id,
    answers: new Map<question.ID, string>(),
    focusPending: true,
  };
}

export function create(deps: dependency.Register) {
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
      }
    });

    return result;
  };

  return reducer;
}
