import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const macedonian: Translation = {
  chooseYourLanguage: 'Одберете јазик',
  languageName: 'Македонски',
  chooseYourVoice: 'Одберете глас',
  noVoiceAvailable: 'Системот не подржува глас на овој јазик.',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('Слон'),
    tiger: expectAnswer.ignoreCase('Тигар'),
    lion: expectAnswer.ignoreCase('Лав'),
    dog: expectAnswer.ignoreCase('Куче'),
    wolf: expectAnswer.ignoreCase('Волк'),
    fox: expectAnswer.ignoreCase('Лисица', 'Лисац'),
    pig: expectAnswer.ignoreCase('Свиња'),
    goat: expectAnswer.ignoreCase('Коза'),
    sheep: expectAnswer.ignoreCase('овца'),
    bear: expectAnswer.ignoreCase('Мечка'),
    giraffe: expectAnswer.ignoreCase('Жирафа'),
  },
  hereItSays: 'Тука пишува',
  nothingIsWrittenHere: 'Тука ништо не пишува.',
  questionImageAlt: 'Слика-Прашање',
};
