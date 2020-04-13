import * as i18n from "./i18n";
import * as question from "./question";
import * as speech from "./speech";

export const CHANGE_ANSWER = "CHANGE_ANSWER";

interface ChangeAnswer {
  type: typeof CHANGE_ANSWER;
  answer: string;
}

export function changeAnswer(answer: string): Action {
  return { type: CHANGE_ANSWER, answer: answer };
}

export const GOTO_QUESTION = "GOTO_QUESTION";

interface GotoQuestion {
  type: typeof GOTO_QUESTION;
  questionID: question.ID;
}

export function gotoQuestion(questionID: question.ID): Action {
  return { type: GOTO_QUESTION, questionID: questionID };
}

export const ASK_TO_REFOCUS = "ASK_TO_REFOCUS";

interface AskToRefocus {
  type: typeof ASK_TO_REFOCUS;
}

export function askToRefocus(): Action {
  return { type: ASK_TO_REFOCUS };
}

export const ACK_REFOCUS = "ACK_REFOCUS";

interface AckRefocus {
  type: typeof ACK_REFOCUS;
}

export function ackRefocus(): Action {
  return { type: ACK_REFOCUS };
}

export const TOGGLE_PREFERENCES = "TOGGLE_PREFERENCES";

interface TogglePreferences {
  type: typeof TOGGLE_PREFERENCES;
  value: boolean;
}

export function togglePreferences(value: boolean): Action {
  return { type: TOGGLE_PREFERENCES, value: value };
}

export const CHANGE_TRANSLATION = "CHANGE_TRANSLATION";

interface ChangeTranslation {
  type: typeof CHANGE_TRANSLATION;
  language: i18n.LanguageID;
}

export function changeTranslation(language: i18n.LanguageID): Action {
  return { type: CHANGE_TRANSLATION, language };
}

export const CHANGE_VOICE = "CHANGE_VOICE";

interface ChangeVoice {
  type: typeof CHANGE_VOICE;
  voice: speech.VoiceID | undefined;
}

export function changeVoice(voice: speech.VoiceID | undefined): Action {
  return { type: CHANGE_VOICE, voice };
}

export const DELETE_ALL = "DELETE_ALL";

interface DeleteAll {
  type: typeof DELETE_ALL;
}

export function deleteAll(): Action {
  return { type: DELETE_ALL };
}

export type Action =
  | ChangeAnswer
  | GotoQuestion
  | AskToRefocus
  | AckRefocus
  | TogglePreferences
  | ChangeTranslation
  | ChangeVoice
  | DeleteAll;
