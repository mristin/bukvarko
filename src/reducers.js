"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immer_1 = require("immer");
const immer_2 = require("immer");
const actions_1 = require("./actions");
const QuestionBank_1 = require("./QuestionBank");
immer_1.enableMapSet(); //  See https://immerjs.github.io/immer/docs/installation#pick-your-immer-version
function verifyState(state) {
    if (!QuestionBank_1.questionBank.has(state.currentQuestion)) {
        throw Error(`Current question is not in the question bank: ${state.currentQuestion}`);
    }
    for (const id of state.answers.keys()) {
        if (!QuestionBank_1.questionBank.has(id)) {
            throw Error(`Answer is given to a question with invalid ID: ${id}`);
        }
    }
}
// TODO: add state storing/retrieving from the URL
function initializeState() {
    if (QuestionBank_1.questionBank.questions.length === 0) {
        throw Error("Unexpected empty list of questions");
    }
    const result = {
        currentQuestion: QuestionBank_1.questionBank.questions[0].id,
        answers: new Map(),
    };
    verifyState(result);
    return result;
}
const initialState = initializeState();
function bukvarkoApp(state = initialState, action) {
    const result = immer_2.produce(state, (draft) => {
        switch (action.type) {
            case actions_1.CHANGE_ANSWER:
                draft.answers.set(state.currentQuestion, action.answer);
                break;
            case actions_1.GOTO_PREVIOUS_QUESTION:
                draft.currentQuestion = QuestionBank_1.questionBank.previous(state.currentQuestion);
                break;
            case actions_1.GOTO_NEXT_QUESTION:
                draft.currentQuestion = QuestionBank_1.questionBank.next(state.currentQuestion);
                break;
        }
    });
    verifyState(result);
    return result;
}
exports.bukvarkoApp = bukvarkoApp;
