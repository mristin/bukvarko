import "typeface-roboto";

import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { App } from "./components/App";
import * as dependency from "./dependency";
import * as question from "./question";
import * as select from "./select";
import * as storeFactory from "./storeFactory";

const deps: dependency.Register = {
  questionBank: question.bank,
  speechSynthesis: speechSynthesis,
};

const store = storeFactory.produce(deps);

const selectWithDeps = new select.WithDeps(deps);

render(
  <Provider store={store}>
    <select.Context.Provider value={selectWithDeps}>
      <App />
    </select.Context.Provider>
  </Provider>,
  document.getElementById("root")
);
