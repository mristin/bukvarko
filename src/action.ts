import * as question from "./question";

export const CHANGE_ANSWER = "CHANGE_ANSWER";

interface ChangeAnswer {
  type: typeof CHANGE_ANSWER;
  answer: string;
}

export const GOTO_QUESTION = "GOTO_QUESTION";
interface GotoQuestion {
  type: typeof GOTO_QUESTION;
  questionID: question.ID;
}

export const ASK_TO_REFOCUS = "ASK_TO_REFOCUS";

interface AskToRefocus {
  type: typeof ASK_TO_REFOCUS;
}

export const ACK_REFOCUS = "ACK_REFOCUS";

interface AckRefocus {
  type: typeof ACK_REFOCUS;
}

export type Action = ChangeAnswer | GotoQuestion | AskToRefocus | AckRefocus;

export function changeAnswer(answer: string): Action {
  return { type: CHANGE_ANSWER, answer: answer };
}

export function gotoQuestion(questionID: question.ID): Action {
  return { type: GOTO_QUESTION, questionID: questionID };
}

export function askToRefocus(): Action {
  return { type: ASK_TO_REFOCUS };
}

export function ackRefocus(): Action {
  return { type: ACK_REFOCUS };
}
