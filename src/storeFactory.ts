import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import * as dependency from "./dependency";
import * as reducer from "./reducer";
import * as stateInvariants from "./stateInvariants";

export function produce(deps: dependency.Registry) {
  return createStore(
    reducer.create(deps),
    applyMiddleware(
      stateInvariants.create(deps.questionBank),
      thunk.withExtraArgument(deps)
    )
  );
}
