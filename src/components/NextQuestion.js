"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const ArrowRight_1 = require("@material-ui/icons/ArrowRight");
const React = require("react");
const react_redux_1 = require("react-redux");
const actions_1 = require("../actions");
const mapDispatchToProps = {
    gotoNextQuestion: actions_1.gotoNextQuestion,
};
const connector = react_redux_1.connect(null, mapDispatchToProps);
const component = (props) => (React.createElement(core_1.IconButton, { onClick: props.gotoNextQuestion },
    React.createElement(ArrowRight_1.default, { fontSize: "large" })));
exports.NextQuestion = connector(component);
