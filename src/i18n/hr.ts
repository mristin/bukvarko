import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const croatian: Translation = {
  chooseYourLanguage: 'Jezik',
  languageName: 'Hrvatski',
  chooseYourVoice: 'Glas',
  noVoiceAvailable: 'Sustav ne podržava glas za ovaj jezik.',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('slon'),
    tiger: expectAnswer.ignoreCase('tigar'),
    lion: expectAnswer.ignoreCase('lav'),
    dog: expectAnswer.ignoreCase('pas'),
    wolf: expectAnswer.ignoreCase('vuk'),
    fox: expectAnswer.ignoreCase('lisica', 'lisac'),
    pig: expectAnswer.ignoreCase('svinja'),
    goat: expectAnswer.ignoreCase('koza', 'jarac', 'kozlić'),
    sheep: expectAnswer.ignoreCase('ovca'),
    bear: expectAnswer.ignoreCase('medvjed'),
    giraffe: expectAnswer.ignoreCase('žirafa'),
  },
  hereItSays: 'Ovdje piše',
  nothingIsWrittenHere: 'Ovdje ništa ne piše.',
  questionImageAlt: 'slika-pitanje',
};
