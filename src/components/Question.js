"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const QuestionBank_1 = require("../QuestionBank");
const mapStateToProps = (state) => {
    const question = QuestionBank_1.questionBank.get(state.currentQuestion);
    return { url: question.imageURL, alt: question.id };
};
const connector = react_redux_1.connect(mapStateToProps);
const component = (props) => (React.createElement("img", { src: props.url, alt: props.alt, style: { width: "90%", border: "1px solid black" } }));
exports.Question = connector(component);
