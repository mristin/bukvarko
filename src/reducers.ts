import {produce} from 'immer';

import {QuestionID, questionBank} from './QuestionBank';
import {CHANGE_ANSWER, Action} from './actions';



interface State {
    readonly currentQuestion: QuestionID;
    readonly answers: Map<QuestionID, string>;
}

function verifyState(state: State) {
    if (!questionBank.has(state.currentQuestion)) {
        throw Error(`Current question is not in the question bank: ${state.currentQuestion}`);
    }

    for (const id of state.answers.keys()) {
        if (!questionBank.has(id)) {
            throw Error(`Answer is given to a question with invalid ID: ${id}`);
        }
    }
}

function initializeState(): State {
    if (questionBank.questions.length === 0) {
        throw Error("Unexpected empty list of questions");
    }

    const result = {
        currentQuestion: questionBank.questions[0].id,
        answers: new Map<QuestionID, string>()
    };

    verifyState(result);

    return result;
}

const initialState = initializeState();

export function bukvarkoApp(state: State = initialState, action: Action): State {
    const result = produce(state,
        (draft) => {
        switch (action.type) {
            case CHANGE_ANSWER:
                draft.answers.set(state.currentQuestion, action.answer);
                break;
        }
    });

    verifyState(result);
    return result;
}

// TODO: continue with https://redux.js.org/basics/example and https://redux.js.org/recipes/usage-with-typescript
