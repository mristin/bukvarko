"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("typeface-roboto");
const React = require("react");
const react_dom_1 = require("react-dom");
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const App_1 = require("./components/App");
const reducers_1 = require("./reducers");
const store = redux_1.createStore(reducers_1.bukvarkoApp);
react_dom_1.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(App_1.App, null)), document.getElementById("root"));
