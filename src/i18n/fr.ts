import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const french: Translation = {
  chooseYourLanguage: 'Langue',
  languageName: 'Francais',
  chooseYourVoice: 'Voix',
  noVoiceAvailable: 'Le logiciel ne fournit pas aucune voix pour cette langue.',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('éléphant'),
    tiger: expectAnswer.ignoreCase('tigre'),
    lion: expectAnswer.ignoreCase('lion'),
    dog: expectAnswer.ignoreCase('chien'),
  },
  hereItSays: 'Ça dit ici',
  nothingIsWrittenHere: 'Ça ne dit rien ici.',
  questionImageAlt: 'question',
};
