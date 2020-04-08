import { enableMapSet, produce } from "immer";

import {
  ACK_REFOCUS,
  ASK_TO_REFOCUS,
  Action,
  CHANGE_ANSWER,
  GOTO_QUESTION,
} from "./actions";
import { Dependencies } from "./dependencies";
import { QuestionID } from "./QuestionBank";

enableMapSet(); //  See https://immerjs.github.io/immer/docs/installation#pick-your-immer-version

export interface State {
  readonly currentQuestion: QuestionID;
  readonly answers: Map<QuestionID, string>;
  readonly focusPending: boolean;
}

export function initializeState(deps: Dependencies) {
  return {
    currentQuestion: deps.questionBank.questions[0].id,
    answers: new Map<QuestionID, string>(),
    focusPending: true,
  };
}

export function create(deps: Dependencies) {
  const initialState = initializeState(deps);

  const reducer = (state: State = initialState, action: Action): State => {
    const result = produce(state, (draft) => {
      switch (action.type) {
        case CHANGE_ANSWER:
          draft.answers.set(state.currentQuestion, action.answer);
          break;
        case GOTO_QUESTION:
          draft.currentQuestion = action.questionID;
          break;
        case ASK_TO_REFOCUS:
          draft.focusPending = true;
          break;
        case ACK_REFOCUS:
          draft.focusPending = false;
      }
    });

    return result;
  };

  return reducer;
}
