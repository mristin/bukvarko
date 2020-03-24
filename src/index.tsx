import "typeface-roboto";

import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { App } from "./components/App";
import { bukvarkoApp } from "./reducers";

const store = createStore(bukvarkoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
