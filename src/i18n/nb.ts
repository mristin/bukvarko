import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const norwegian: Translation = {
  chooseYourLanguage: 'Språk',
  languageName: 'Norsk (bokmål)',
  chooseYourVoice: 'Stemme',
  noVoiceAvailable: 'Systemet støtter ikke talegjenkjenning på dette språket.',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('elefant'),
    tiger: expectAnswer.ignoreCase('tiger'),
    lion: expectAnswer.ignoreCase('løve'),
    dog: expectAnswer.ignoreCase('hund'),
    wolf: expectAnswer.ignoreCase('ulv'),
    fox: expectAnswer.ignoreCase('rev'),
    pig: expectAnswer.ignoreCase('gris', 'svin'),
    goat: expectAnswer.ignoreCase('geit'),
    sheep: expectAnswer.ignoreCase('sau', 'får'),
    bear: expectAnswer.ignoreCase('bjørn'),
    giraffe: expectAnswer.ignoreCase('sjiraff'),
  },
  hereItSays: 'Her står det',
  nothingIsWrittenHere: 'Her står det ingenting.',
  questionImageAlt: 'bilde-spørsmål',
};
