"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHANGE_ANSWER = "CHANGE_ANSWER";
exports.GOTO_PREVIOUS_QUESTION = "GOTO_PREVIOUS_QUESTION";
exports.GOTO_NEXT_QUESTION = "GOTO_NEXT_QUESTION";
function changeAnswer(answer) {
    return { type: exports.CHANGE_ANSWER, answer: answer };
}
exports.changeAnswer = changeAnswer;
function gotoPreviousQuestion() {
    return { type: exports.GOTO_PREVIOUS_QUESTION };
}
exports.gotoPreviousQuestion = gotoPreviousQuestion;
function gotoNextQuestion() {
    return { type: exports.GOTO_NEXT_QUESTION };
}
exports.gotoNextQuestion = gotoNextQuestion;
