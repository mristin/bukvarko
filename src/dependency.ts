import * as i18n from "./i18n";
import * as question from "./question";
import * as speech from "./speech";

/**
 * Represent a bundle of global dependencies.
 */
export interface Registry {
  questionBank: question.Bank;
  speechSynthesis: SpeechSynthesis;
  translations: i18n.Translations;
  voices: speech.Voices;
  voicesByLanguage: speech.VoicesByLanguage;
}

export function initializeRegistry(
  questionBank: question.Bank,
  speechSynthesis: SpeechSynthesis,
  translations: i18n.Translations
): Registry {
  const voices = new speech.Voices(speechSynthesis.getVoices());

  const voicesByLanguage = speech.groupVoicesByLanguage(
    voices,
    translations.keys()
  );

  return {
    questionBank,
    translations,
    speechSynthesis,
    voices,
    voicesByLanguage,
  };
}
