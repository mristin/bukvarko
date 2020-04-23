import { Dispatch } from 'redux';

import * as action from './action';
import * as app from './app';
import * as dependency from './dependency';

export function nextQuestion() {
  return function (dispatch: Dispatch, getState: () => app.State, deps: dependency.Registry): void {
    const questionID = deps.questionBank.next(getState().currentQuestion);
    dispatch(action.gotoQuestion(questionID));
  };
}

export function previousQuestion() {
  return function (dispatch: Dispatch, getState: () => app.State, deps: dependency.Registry): void {
    const questionID = deps.questionBank.previous(getState().currentQuestion);
    dispatch(action.gotoQuestion(questionID));
  };
}

export function speak() {
  return function (_: Dispatch, getState: () => app.State, deps: dependency.Registry): void {
    const state = getState();

    const voice = state.voiceByLanguage.get(state.language);
    if (voice === undefined) {
      return;
    }

    const answer = state.answers.get(state.currentQuestion) || '';

    const translation = deps.translations.get(state.language);
    if (translation === undefined) {
      throw Error(`No translation available for the language in the state: ${state.language}`);
    }

    const text = answer !== '' ? `${translation.hereItSays}: ${answer}` : translation.nothingIsWrittenHere;

    const u = new SpeechSynthesisUtterance();
    u.voice = deps.voices.get(voice);
    u.lang = voice.lang;
    u.text = text;
    u.volume = 1; // 0 to 1
    u.rate = 0.7; // 0.1 to 1
    u.pitch = 2; //0 to 2

    deps.aSpeechSynthesis.cancel();
    deps.aSpeechSynthesis.speak(u);
  };
}

export function setSound() {
  return function (_: Dispatch, getState: () => app.State, deps: dependency.Registry): void {
    const state = getState();

    const question = deps.questionBank.get(state.currentQuestion);
    if (question.soundURL !== undefined) {
      deps.player.set(question.soundURL);
    }
  };
}

export function playSound() {
  return function (_: Dispatch, getState: () => app.State, deps: dependency.Registry): void {
    const state = getState();

    const question = deps.questionBank.get(state.currentQuestion);
    if (question.soundURL !== undefined) {
      deps.player.play();
    }
  };
}

export function pauseSound() {
  return function (_: Dispatch, __: () => app.State, deps: dependency.Registry): void {
    deps.player.pause();
  };
}
