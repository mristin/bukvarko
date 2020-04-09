import { Dispatch } from "redux";

import * as action from "./action";
import * as dependency from "./dependency";
import * as reducer from "./reducer";

export function nextQuestion() {
  return function (
    dispatch: Dispatch,
    getState: () => reducer.State,
    deps: dependency.Register
  ): void {
    const questionID = deps.questionBank.next(getState().currentQuestion);
    dispatch(action.gotoQuestion(questionID));
  };
}

export function previousQuestion() {
  return function (
    dispatch: Dispatch,
    getState: () => reducer.State,
    deps: dependency.Register
  ): void {
    const questionID = deps.questionBank.previous(getState().currentQuestion);
    dispatch(action.gotoQuestion(questionID));
  };
}
