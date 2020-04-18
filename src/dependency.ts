import { History, LocationState } from 'history';

import * as i18n from './i18n';
import * as question from './question';
import * as speech from './speech';

/**
 * Represent a bundle of global dependencies.
 */
export interface Registry {
  questionBank: question.Bank;
  aSpeechSynthesis: SpeechSynthesis;
  translations: i18n.Translations;
  voices: speech.Voices;
  voicesByLanguage: speech.VoicesByLanguage;
  storage: Storage;
  history: History<LocationState>;
}

export function initializeRegistry(
  questionBank: question.Bank,
  aSpeechSynthesis: SpeechSynthesis,
  translations: i18n.Translations,
  storage: Storage,
  history: History<LocationState>,
): Registry {
  const voices = new speech.Voices(aSpeechSynthesis.getVoices());

  const voicesByLanguage = speech.groupVoicesByLanguage(voices, translations.keys());

  return {
    questionBank,
    translations,
    aSpeechSynthesis: aSpeechSynthesis,
    voices,
    voicesByLanguage,
    storage,
    history,
  };
}
