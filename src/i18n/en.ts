import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const english: Translation = {
  chooseYourLanguage: 'Language',
  languageName: 'English',
  chooseYourVoice: 'Voice',
  noVoiceAvailable: 'Your system does not provide a voice for this language.',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('elephant', 'the elephant'),
    tiger: expectAnswer.ignoreCase('tiger', 'the tiger'),
    lion: expectAnswer.ignoreCase('lion', 'the lion'),
    dog: expectAnswer.ignoreCase('dog', 'the dog'),
    wolf: expectAnswer.ignoreCase('wolf', 'the wolf'),
    fox: expectAnswer.ignoreCase('fox', 'the fox'),
    pig: expectAnswer.ignoreCase('pig', 'the pig', 'hog', 'the hog'),
    goat: expectAnswer.ignoreCase('goat', 'the goat'),
    bear: expectAnswer.ignoreCase('bear', 'the bear'),
    giraffe: expectAnswer.ignoreCase('giraffe', 'the giraffe'),
  },
  hereItSays: 'Here it says',
  nothingIsWrittenHere: 'Nothing has been written.',
  questionImageAlt: 'question image',
};
