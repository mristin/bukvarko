import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const swissGerman: Translation = {
  chooseYourLanguage: 'Sprach',
  languageName: 'Schwyzerdütsch',
  chooseYourVoice: 'Stimm',
  noVoiceAvailable: 'Das System unterstützt kei Stimm für die Sprach.',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('Elefant'),
    tiger: expectAnswer.ignoreCase('Tiger'),
    lion: expectAnswer.ignoreCase('Loi', 'Leu', 'Löi'),
    dog: expectAnswer.ignoreCase('Hund'),
    wolf: expectAnswer.ignoreCase('Wolf'),
    fox: expectAnswer.ignoreCase('Fuchs'),
    pig: expectAnswer.ignoreCase('Schwein', 'Sau', 'Säuli'),
    goat: expectAnswer.ignoreCase('Ziege', 'Geiss', 'Geissli'),
    sheep: expectAnswer.ignoreCase('Schaf', 'Schäfli'),
    bear: expectAnswer.ignoreCase('Bär'),
    giraffe: expectAnswer.ignoreCase('Giraffe', 'Giraff'),
  },
  hereItSays: 'Da staht',
  nothingIsWrittenHere: 'Da staht gar nüt.',
  questionImageAlt: 'Frag',
};
