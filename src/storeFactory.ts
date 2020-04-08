import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import { Dependencies } from "./dependencies";
import { questionBank } from "./QuestionBank";
import * as reducer from "./reducer";
import * as stateInvariants from "./stateInvariants";

export function produce(deps: Dependencies) {
  return createStore(
    reducer.create(deps),
    applyMiddleware(
      stateInvariants.create(questionBank),
      thunk.withExtraArgument(deps)
    )
  );
}
