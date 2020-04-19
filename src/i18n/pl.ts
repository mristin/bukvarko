import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const polish: Translation = {
  chooseYourLanguage: 'Język',
  languageName: 'Polski',
  chooseYourVoice: 'Głos',
  noVoiceAvailable: 'System nie jest w stanie dostarczyć głosu dla tego języka.',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('słoń'),
    tiger: expectAnswer.ignoreCase('tygrys'),
    lion: expectAnswer.ignoreCase('lew'),
    dog: expectAnswer.ignoreCase('pies', 'piesek'),
    wolf: expectAnswer.ignoreCase('wilk'),
    fox: expectAnswer.ignoreCase('lis'),
    pig: expectAnswer.ignoreCase('świnia', 'świnka'),
    goat: expectAnswer.ignoreCase('koza', 'kozioł', 'kózka', 'baran', 'baranek'),
    bear: expectAnswer.ignoreCase('niedźwiedź', 'niedźwiadek'),
    giraffe: expectAnswer.ignoreCase('żyrafa'),
  },
  hereItSays: 'Napisano',
  nothingIsWrittenHere: 'Nic nie napisano.',
  questionImageAlt: 'obrazek-pytanie',
};
