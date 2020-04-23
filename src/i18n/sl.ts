import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const slovenian: Translation = {
  chooseYourLanguage: 'Jezik',
  languageName: 'Slovenščina',
  chooseYourVoice: 'Glas',
  noVoiceAvailable: 'Sistem ne podpira prepoznavanja govora v tem jeziku.',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('slon'),
    tiger: expectAnswer.ignoreCase('tiger'),
    lion: expectAnswer.ignoreCase('lev'),
    dog: expectAnswer.ignoreCase('pes'),
    wolf: expectAnswer.ignoreCase('volk'),
    fox: expectAnswer.ignoreCase('lisica', 'lisac'),
    pig: expectAnswer.ignoreCase('prašič', 'prasica'),
    goat: expectAnswer.ignoreCase('koza'),
    bear: expectAnswer.ignoreCase('medved'),
    giraffe: expectAnswer.ignoreCase('žirafa'),
  },
  hereItSays: 'Tu piše',
  nothingIsWrittenHere: 'Tu ne piše nič.',
  questionImageAlt: 'vprašanje-slika',
};
