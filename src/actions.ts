export const CHANGE_ANSWER = "CHANGE_ANSWER";

interface ChangeAnswer {
    type: typeof CHANGE_ANSWER,
    answer: string
}

export const CHANGE_QUESTION = "CHANGE_QUESTION";

interface ChangeQuestion {
    type: typeof CHANGE_QUESTION
}

export type Action = ChangeAnswer | ChangeQuestion;

export function changeAnswer(answer: string): Action {
    return {type: CHANGE_ANSWER, answer: answer};
}

export function changeQuestion(): Action {
    return {type: CHANGE_QUESTION}
}
