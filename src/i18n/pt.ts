import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const portuguese: Translation = {
  chooseYourLanguage: 'O idioma',
  languageName: 'Português',
  chooseYourVoice: 'A voz',
  noVoiceAvailable: 'O sistema não suporta voz de narração para este idioma.',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('elefante'),
    tiger: expectAnswer.ignoreCase('tigre'),
    lion: expectAnswer.ignoreCase('leão'),
    dog: expectAnswer.ignoreCase('cão'),
    wolf: expectAnswer.ignoreCase('lobo', 'loba'),
    fox: expectAnswer.ignoreCase('raposa', 'raposo'),
    pig: expectAnswer.ignoreCase('porco'),
    goat: expectAnswer.ignoreCase('cabra', 'cabro'),
    bear: expectAnswer.ignoreCase('urso'),
    giraffe: expectAnswer.ignoreCase('girafa'),
  },
  hereItSays: 'Aqui está escrito',
  nothingIsWrittenHere: 'Aqui não está nada escrito.',
  questionImageAlt: 'A pergunta',
};
