import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const bosnian: Translation = {
  chooseYourLanguage: 'Jezik',
  languageName: 'Bosanski',
  chooseYourVoice: 'Glas',
  noVoiceAvailable: 'Sistem ne podržava glas za ovaj jezik.',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('slon'),
    tiger: expectAnswer.ignoreCase('tigar'),
    lion: expectAnswer.ignoreCase('lav'),
    dog: expectAnswer.ignoreCase('pas', 'cuko', 'cuka'),
    wolf: expectAnswer.ignoreCase('vuk'),
    fox: expectAnswer.ignoreCase('lisica', 'lisac'),
    pig: expectAnswer.ignoreCase('svinja', 'prase'),
    goat: expectAnswer.ignoreCase('koza', 'jarac', 'kozlić'),
    bear: expectAnswer.ignoreCase('medvjed'),
    giraffe: expectAnswer.ignoreCase('žirafa'),
  },
  hereItSays: 'Ovdje piše',
  nothingIsWrittenHere: 'Ovdje ništa ne piše.',
  questionImageAlt: 'slika-pitanje',
};
