import "typeface-roboto";

import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { App } from "./components/App";
import { questionBank } from "./QuestionBank";
import * as storeFactory from "./storeFactory";

const deps = { questionBank };
const store = storeFactory.produce(deps);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
