import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const german: Translation = {
  chooseYourLanguage: 'Sprache',
  languageName: 'Deutsch',
  chooseYourVoice: 'Stimme',
  noVoiceAvailable: 'Das System unterstützt keine Stimme für diese Sprache.',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('Elephant'),
    tiger: expectAnswer.ignoreCase('Tiger'),
    lion: expectAnswer.ignoreCase('Löwe'),
    dog: expectAnswer.ignoreCase('Hund'),
  },
  hereItSays: 'Hier steht',
  nothingIsWrittenHere: 'Hier steht nichts.',
  questionImageAlt: 'Frage',
};
