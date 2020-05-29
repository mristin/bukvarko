import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const italian: Translation = {
  chooseYourLanguage: 'Lingua',
  languageName: 'Italiano',
  chooseYourVoice: 'Voce',
  noVoiceAvailable: 'Il sistema non supporta la voce per questa lingua..',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('elefante'),
    tiger: expectAnswer.ignoreCase('tigre'),
    lion: expectAnswer.ignoreCase('leone'),
    dog: expectAnswer.ignoreCase('cane'),
    wolf: expectAnswer.ignoreCase('lupo', 'lupa'),
    fox: expectAnswer.ignoreCase('volpe'),
    pig: expectAnswer.ignoreCase('maiale', 'porco'),
    goat: expectAnswer.ignoreCase('capra'),
    sheep: expectAnswer.ignoreCase('pecora'),
    bear: expectAnswer.ignoreCase('orso', 'orsa'),
    giraffe: expectAnswer.ignoreCase('giraffa'),
  },
  hereItSays: "Qui c'è scritto",
  nothingIsWrittenHere: "Qui non c'è niente scritto.",
  questionImageAlt: 'Questione',
};
