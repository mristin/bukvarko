import { Dispatch } from "redux";

import * as action from "./action";
import * as app from "./app";
import * as dependency from "./dependency";

export function nextQuestion() {
  return function (
    dispatch: Dispatch,
    getState: () => app.State,
    deps: dependency.Registry
  ): void {
    const questionID = deps.questionBank.next(getState().currentQuestion);
    dispatch(action.gotoQuestion(questionID));
  };
}

export function previousQuestion() {
  return function (
    dispatch: Dispatch,
    getState: () => app.State,
    deps: dependency.Registry
  ): void {
    const questionID = deps.questionBank.previous(getState().currentQuestion);
    dispatch(action.gotoQuestion(questionID));
  };
}

export function speak() {
  return function (
    _: Dispatch,
    getState: () => app.State,
    deps: dependency.Registry
  ): void {
    const voice = getState().voice;
    if (voice === undefined) {
      return;
    }

    const answer = getState().answers.get(getState().currentQuestion) || "";

    const translation = deps.translations.get(getState().language)!;

    const text =
      answer !== ""
        ? `${translation.hereItSays}: ${answer}`
        : translation.nothingIsWrittenHere;

    const u = new SpeechSynthesisUtterance();
    u.voice = deps.voices.get(voice);
    u.text = text;
    u.volume = 1; // 0 to 1
    u.rate = 0.7; // 0.1 to 1
    u.pitch = 2; //0 to 2

    deps.speechSynthesis.cancel();
    deps.speechSynthesis.speak(u);
  };
}
