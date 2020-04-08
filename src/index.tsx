import "typeface-roboto";

import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { App } from "./components/App";
import * as storeFactory from "./storeFactory";

const store = storeFactory.produce();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
