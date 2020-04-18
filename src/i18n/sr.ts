import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const serbian: Translation = {
  chooseYourLanguage: 'Jezik',
  languageName: 'Srpski',
  chooseYourVoice: 'Glas',
  noVoiceAvailable: 'Sistem ne podržava glas za ovaj jezik.',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('slon', 'слон'),
    tiger: expectAnswer.ignoreCase('tigar', 'тигар'),
    lion: expectAnswer.ignoreCase('lav', 'лав'),
    dog: expectAnswer.ignoreCase('pas', 'пас'),
  },
  hereItSays: 'Ovde piše',
  nothingIsWrittenHere: 'Ovde ništa ne piše.',
  questionImageAlt: 'slika-pitanje',
};
