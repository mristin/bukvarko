"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grey_1 = require("@material-ui/core/colors/grey");
const yellow_1 = require("@material-ui/core/colors/yellow");
const Star_1 = require("@material-ui/icons/Star");
const React = require("react");
const react_redux_1 = require("react-redux");
const QuestionBank_1 = require("../QuestionBank");
const mapStateToProps = (state) => {
    const hitsIDs = new Array(QuestionBank_1.questionBank.questions.length);
    let currentIndex = -1;
    for (const [i, question] of QuestionBank_1.questionBank.questions.entries()) {
        const answer = state.answers.get(question.id) || "";
        const hit = QuestionBank_1.compareAnswers(question.expectedAnswer, answer);
        hitsIDs[i] = [hit, question.id];
        if (question.id === state.currentQuestion) {
            currentIndex = i;
        }
    }
    if (currentIndex < 0) {
        throw Error(`Expected current question to match an index in questions: ${state.currentQuestion}`);
    }
    return { hitsIDs, currentIndex };
};
const connector = react_redux_1.connect(mapStateToProps);
const component = (props) => {
    return (React.createElement(React.Fragment, null, props.hitsIDs.map(([hit, id], i) => {
        const style = Object.assign({ color: hit ? yellow_1.default[700] : grey_1.default[500] }, (i === props.currentIndex ? { background: "azure" } : {}));
        return React.createElement(Star_1.default, { key: id, style: style });
    })));
};
exports.Score = connector(component);
