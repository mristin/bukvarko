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
    dog: expectAnswer.ignoreCase('pas', 'kuče', 'kuca', 'пас', 'куче', 'куца'),
    wolf: expectAnswer.ignoreCase('vuk', 'vučica', 'вук', 'вучица'),
    fox: expectAnswer.ignoreCase('lisac', 'lisica', 'лисац', 'лисица'),
    pig: expectAnswer.ignoreCase('svinja', 'prase', 'свиња', 'прасе'),
    goat: expectAnswer.ignoreCase('koza', 'jarac', 'kozlić', 'коза', 'јарац', 'козлић'),
    bear: expectAnswer.ignoreCase('medved', 'медвед'),
    giraffe: expectAnswer.ignoreCase('žirafa', 'жирафа'),
  },
  hereItSays: 'Ovde piše',
  nothingIsWrittenHere: 'Ovde ništa ne piše.',
  questionImageAlt: 'slika-pitanje',
};
