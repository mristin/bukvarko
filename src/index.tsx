import "typeface-roboto";

import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { App } from "./components/App";
import { questionBank } from "./QuestionBank";
import * as select from "./select";
import * as storeFactory from "./storeFactory";

const deps = { questionBank };
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
