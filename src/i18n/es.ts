import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const spanish: Translation = {
  chooseYourLanguage: 'Idioma',
  languageName: 'Castellano',
  chooseYourVoice: 'Voz',
  noVoiceAvailable: 'El sistema no soporta la narración en el idioma escogido.',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('elefante'),
    tiger: expectAnswer.ignoreCase('tigre'),
    lion: expectAnswer.ignoreCase('leon'),
    dog: expectAnswer.ignoreCase('perro'),
  },
  hereItSays: 'Aca dice',
  nothingIsWrittenHere: 'Aca no dice nada.',
  questionImageAlt: 'la pregunta',
};
