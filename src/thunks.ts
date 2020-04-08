import { Dispatch } from "redux";

import { gotoQuestion } from "./actions";
import { Dependencies } from "./dependencies";
import { State } from "./reducer";

export function nextQuestion() {
  return function (
    dispatch: Dispatch,
    getState: () => State,
    deps: Dependencies
  ): void {
    const questionID = deps.questionBank.next(getState().currentQuestion);
    dispatch(gotoQuestion(questionID));
  };
}

export function previousQuestion() {
  return function (
    dispatch: Dispatch,
    getState: () => State,
    deps: Dependencies
  ): void {
    const questionID = deps.questionBank.previous(getState().currentQuestion);
    dispatch(gotoQuestion(questionID));
  };
}
