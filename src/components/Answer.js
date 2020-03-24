"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const React = require("react");
const react_redux_1 = require("react-redux");
const actions_1 = require("../actions");
const mapStateToProps = (state) => {
    const answer = state.answers.get(state.currentQuestion) || "";
    return { answer };
};
const mapDispatchToProps = {
    changeAnswer: actions_1.changeAnswer,
};
const connector = react_redux_1.connect(mapStateToProps, mapDispatchToProps);
const component = (props) => (React.createElement(core_1.TextField, { variant: "outlined", inputProps: {
        maxLength: 30,
        size: 30,
    }, onChange: (e) => {
        props.changeAnswer(e.target.value);
    }, value: props.answer }));
exports.Answer = connector(component);
