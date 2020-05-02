import * as expectAnswer from '../expectAnswer';
import { Translation } from '../i18n';

export const russian: Translation = {
  chooseYourLanguage: 'Выбери язык',
  languageName: 'Русский',
  chooseYourVoice: 'Выбери голос',
  noVoiceAvailable: 'Твоя система не предоставляет голос для этого языка.',
  answerCheckers: {
    elephant: expectAnswer.ignoreCase('слон'),
    tiger: expectAnswer.ignoreCase('тигр'),
    lion: expectAnswer.ignoreCase('лев'),
    dog: expectAnswer.ignoreCase('собака'),
    wolf: expectAnswer.ignoreCase('волк'),
    fox: expectAnswer.ignoreCase('лиса'),
    pig: expectAnswer.ignoreCase('свинья', 'боров'),
    goat: expectAnswer.ignoreCase('коза'),
    bear: expectAnswer.ignoreCase('медведь'),
    giraffe: expectAnswer.ignoreCase('жираф'),
  },
  hereItSays: 'Это значит',
  nothingIsWrittenHere: 'Ничего не написано.',
  questionImageAlt: 'Вопрос-Изображение',
};
