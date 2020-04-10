import { Dispatch } from "redux";

import * as action from "./action";
import * as dependency from "./dependency";
import * as reducer from "./reducer";

export function nextQuestion() {
  return function (
    dispatch: Dispatch,
    getState: () => reducer.State,
    deps: dependency.Registry
  ): void {
    const questionID = deps.questionBank.next(getState().currentQuestion);
    dispatch(action.gotoQuestion(questionID));
  };
}

export function previousQuestion() {
  return function (
    dispatch: Dispatch,
    getState: () => reducer.State,
    deps: dependency.Registry
  ): void {
    const questionID = deps.questionBank.previous(getState().currentQuestion);
    dispatch(action.gotoQuestion(questionID));
  };
}

export function speak() {
  return function (
    _: Dispatch,
    getState: () => reducer.State,
    deps: dependency.Registry
  ): void {
    const answer = getState().answers.get(getState().currentQuestion);

    const text = answer === "" ? `Ovde piše: ${answer}` : "Ovde ništa ne piše.";

    const u = new SpeechSynthesisUtterance();
    u.text = text;
    u.lang = "sr-RS";
    u.volume = 1; // 0 to 1
    u.rate = 0.7; // 0.1 to 1
    u.pitch = 2; //0 to 2

    deps.speechSynthesis.cancel();
    deps.speechSynthesis.speak(u);
  };
}
