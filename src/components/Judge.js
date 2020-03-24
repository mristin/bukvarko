"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ThumbDown_1 = require("@material-ui/icons/ThumbDown");
const ThumbUp_1 = require("@material-ui/icons/ThumbUp");
const React = require("react");
const react_redux_1 = require("react-redux");
const QuestionBank_1 = require("../QuestionBank");
const mapStateToProps = (state) => {
    const question = QuestionBank_1.questionBank.get(state.currentQuestion);
    const answer = state.answers.get(state.currentQuestion) || "";
    const hit = QuestionBank_1.compareAnswers(question.expectedAnswer, answer);
    return { hit };
};
const connector = react_redux_1.connect(mapStateToProps);
const component = (props) => props.hit ? (React.createElement(ThumbUp_1.default, { style: { color: "green" } })) : (React.createElement(ThumbDown_1.default, { style: { color: "red" } }));
exports.Judge = connector(component);
