export const CHANGE_ANSWER = "CHANGE_ANSWER";

interface ChangeAnswer {
  type: typeof CHANGE_ANSWER;
  answer: string;
}

export const GOTO_PREVIOUS_QUESTION = "GOTO_PREVIOUS_QUESTION";

interface GotoPreviousQuestion {
  type: typeof GOTO_PREVIOUS_QUESTION;
}

export const GOTO_NEXT_QUESTION = "GOTO_NEXT_QUESTION";

interface GotoNextQuestion {
  type: typeof GOTO_NEXT_QUESTION;
}

export const ASK_TO_REFOCUS = "ASK_TO_REFOCUS";

interface AskToRefocus {
  type: typeof ASK_TO_REFOCUS;
}

export const ACK_REFOCUS = "ACK_REFOCUS";

interface AckRefocus {
  type: typeof ACK_REFOCUS;
}

export type Action =
  | ChangeAnswer
  | GotoPreviousQuestion
  | GotoNextQuestion
  | AskToRefocus
  | AckRefocus;

export function changeAnswer(answer: string): Action {
  return { type: CHANGE_ANSWER, answer: answer };
}

export function gotoPreviousQuestion(): Action {
  return { type: GOTO_PREVIOUS_QUESTION };
}

export function gotoNextQuestion(): Action {
  return { type: GOTO_NEXT_QUESTION };
}

export function askToRefocus(): Action {
  return { type: ASK_TO_REFOCUS };
}

export function ackRefocus(): Action {
  return { type: ACK_REFOCUS };
}
