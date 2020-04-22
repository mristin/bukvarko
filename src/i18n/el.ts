import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const greek: Translation = {
  chooseYourLanguage: 'Γλώσσα',
  languageName: 'Ελληνικά',
  chooseYourVoice: 'Φωνή',
  noVoiceAvailable: 'Το σύστημα δεν υποστηρίζει φωνή για αυτή τη γλώσσα.',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('ελέφαντας', 'ο ελέφαντας'),
    tiger: expectAnswer.ignoreCase('τίγρη', 'η τίγρη'),
    lion: expectAnswer.ignoreCase('λιοντάρι', 'το λιοντάρι'),
    dog: expectAnswer.ignoreCase('σκύλος', 'ο σκύλος'),
    wolf: expectAnswer.ignoreCase('λύκος', 'ο λύκος'),
    fox: expectAnswer.ignoreCase('αλεπού', 'η αλεπού'),
    pig: expectAnswer.ignoreCase('γουρούνι', 'το γουρούνι'),
    goat: expectAnswer.ignoreCase('γίδα', 'η γίδα', 'κατσίκα', 'η κατσίκα'),
    bear: expectAnswer.ignoreCase('αρκούδα', 'η αρκούδα'),
    giraffe: expectAnswer.ignoreCase('καμηλοπάρδαλη', 'η καμηλοπάρδαλη'),
  },
  hereItSays: 'Εδώ λέει',
  nothingIsWrittenHere: 'Εδώ δε λέει τίποτα.',
  questionImageAlt: 'Ερώτηση',
};
