"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const ArrowLeft_1 = require("@material-ui/icons/ArrowLeft");
const React = require("react");
const react_redux_1 = require("react-redux");
const actions_1 = require("../actions");
const mapDispatchToProps = {
    gotoPreviousQuestion: actions_1.gotoPreviousQuestion,
};
const connector = react_redux_1.connect(null, mapDispatchToProps);
const component = (props) => (React.createElement(core_1.IconButton, { onClick: props.gotoPreviousQuestion },
    React.createElement(ArrowLeft_1.default, { fontSize: "large" })));
exports.PreviousQuestion = connector(component);
