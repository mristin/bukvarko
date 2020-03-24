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

export type Action = ChangeAnswer | GotoPreviousQuestion | GotoNextQuestion;

export function changeAnswer(answer: string): Action {
  return { type: CHANGE_ANSWER, answer: answer };
}

export function gotoPreviousQuestion(): Action {
  return { type: GOTO_PREVIOUS_QUESTION };
}

export function gotoNextQuestion(): Action {
  return { type: GOTO_NEXT_QUESTION };
}
