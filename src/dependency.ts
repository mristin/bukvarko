import * as question from "./question";

/**
 * Represent a bundle of global dependencies.
 */
export interface Register {
  questionBank: question.Bank;
  speechSynthesis: SpeechSynthesis;
}
