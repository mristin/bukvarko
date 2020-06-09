import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const dutch: Translation = {
  chooseYourLanguage: 'Taal',
  languageName: 'Nederlands',
  chooseYourVoice: 'Stem',
  noVoiceAvailable: 'Jouw systeem heeft geen stem voor deze taal.',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('olifant', 'de olifant'),
    tiger: expectAnswer.ignoreCase('tijger', 'de tijger'),
    lion: expectAnswer.ignoreCase('leeuw', 'de leeuw'),
    dog: expectAnswer.ignoreCase('hond', 'de hond'),
    wolf: expectAnswer.ignoreCase('wolf', 'de wolf'),
    fox: expectAnswer.ignoreCase('vos', 'de vos'),
    pig: expectAnswer.ignoreCase('varken', 'het varken'),
    goat: expectAnswer.ignoreCase('geit', 'de geit'),
    sheep: expectAnswer.ignoreCase('schaap', 'het schaap'),
    bear: expectAnswer.ignoreCase('beer', 'de beer'),
    giraffe: expectAnswer.ignoreCase('giraffe', 'de giraffe'),
  },
  hereItSays: 'Hier staat',
  nothingIsWrittenHere: 'Er staat niets.',
  questionImageAlt: 'de vraag',
};
