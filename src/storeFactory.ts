import { applyMiddleware, createStore } from "redux";

import { questionBank } from "./QuestionBank";
import { bukvarkoApp } from "./reducers";
import * as stateInvariants from "./stateInvariants";

export function produce() {
  return createStore(
    bukvarkoApp,
    applyMiddleware(stateInvariants.create(questionBank))
  );
}
