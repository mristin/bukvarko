import { enableMapSet } from "immer";
import { produce } from "immer";

import {
  Action,
  CHANGE_ANSWER,
  GOTO_NEXT_QUESTION,
  GOTO_PREVIOUS_QUESTION,
} from "./actions";
import { QuestionID, questionBank } from "./QuestionBank";

enableMapSet(); //  See https://immerjs.github.io/immer/docs/installation#pick-your-immer-version

export interface State {
  readonly currentQuestion: QuestionID;
  readonly answers: Map<QuestionID, string>;
}

function verifyState(state: State) {
  if (!questionBank.has(state.currentQuestion)) {
    throw Error(
      `Current question is not in the question bank: ${state.currentQuestion}`
    );
  }

  for (const id of state.answers.keys()) {
    if (!questionBank.has(id)) {
      throw Error(`Answer is given to a question with invalid ID: ${id}`);
    }
  }
}

// TODO: add state storing/retrieving from the URL
function initializeState(): State {
  if (questionBank.questions.length === 0) {
    throw Error("Unexpected empty list of questions");
  }

  const result = {
    currentQuestion: questionBank.questions[0].id,
    answers: new Map<QuestionID, string>(),
  };

  verifyState(result);

  return result;
}

const initialState = initializeState();

export function bukvarkoApp(
  state: State = initialState,
  action: Action
): State {
  const result = produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_ANSWER:
        draft.answers.set(state.currentQuestion, action.answer);
        break;
      case GOTO_PREVIOUS_QUESTION:
        draft.currentQuestion = questionBank.previous(state.currentQuestion);
        break;
      case GOTO_NEXT_QUESTION:
        draft.currentQuestion = questionBank.next(state.currentQuestion);
        break;
    }
  });

  verifyState(result);
  return result;
}
