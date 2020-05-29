import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const german: Translation = {
  chooseYourLanguage: 'Sprache',
  languageName: 'Deutsch',
  chooseYourVoice: 'Stimme',
  noVoiceAvailable: 'Das System unterstützt keine Stimme für diese Sprache.',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('Elefant', 'der Elefant'),
    tiger: expectAnswer.ignoreCase('Tiger', 'der Tiger'),
    lion: expectAnswer.ignoreCase('Löwe', 'der Löwe'),
    dog: expectAnswer.ignoreCase('Hund', 'der Hund'),
    wolf: expectAnswer.ignoreCase('Wolf', 'der Wolf'),
    fox: expectAnswer.ignoreCase('Fuchs', 'der Fuchs'),
    pig: expectAnswer.ignoreCase('Schwein', 'das Schwein', 'Sau', 'die Sau'),
    goat: expectAnswer.ignoreCase('Ziege', 'die Ziege', 'Geiss', 'die Geiss'),
    sheep: expectAnswer.ignoreCase('Schaf', 'das Schaf'),
    bear: expectAnswer.ignoreCase('Bär', 'der Bär'),
    giraffe: expectAnswer.ignoreCase('Giraffe', 'die Giraffe'),
  },
  hereItSays: 'Hier steht',
  nothingIsWrittenHere: 'Hier steht nichts.',
  questionImageAlt: 'Frage',
};
