import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const english: Translation = {
  chooseYourLanguage: 'Language',
  languageName: 'English',
  chooseYourVoice: 'Voice',
  noVoiceAvailable: 'Your system does not provide a voice for this language.',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('elephant'),
    tiger: expectAnswer.ignoreCase('tiger'),
    lion: expectAnswer.ignoreCase('lion'),
    dog: expectAnswer.ignoreCase('dog'),
  },
  hereItSays: 'Here it says',
  nothingIsWrittenHere: 'Nothing has been written.',
  questionImageAlt: 'question image',
};
