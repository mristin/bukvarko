import * as question from "./question";

/**
 * Represent a bundle of global dependencies.
 */
export interface Registry {
  questionBank: question.Bank;
  speechSynthesis: SpeechSynthesis;
}
