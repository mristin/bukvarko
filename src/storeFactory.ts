import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import * as app from "./app";
import * as autosave from "./autosave";
import * as dependency from "./dependency";
import * as stateInvariants from "./stateInvariants";

export function produce(deps: dependency.Registry) {
  return createStore(
    app.createReducer(deps),
    applyMiddleware(
      stateInvariants.create(deps),
      autosave.create(deps),
      thunk.withExtraArgument(deps)
    )
  );
}
