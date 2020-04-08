import { enableMapSet, produce } from "immer";

import {
  ACK_REFOCUS,
  ASK_TO_REFOCUS,
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
  readonly focusPending: boolean;
}

export function initializeState(): State {
  if (questionBank.questions.length === 0) {
    throw Error("Unexpected empty list of questions");
  }

  const result = {
    currentQuestion: questionBank.questions[0].id,
    answers: new Map<QuestionID, string>(),
    focusPending: true,
  };

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
      case ASK_TO_REFOCUS:
        draft.focusPending = true;
        break;
      case ACK_REFOCUS:
        draft.focusPending = false;
    }
  });

  return result;
}
