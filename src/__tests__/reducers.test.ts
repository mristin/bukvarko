import { gotoNextQuestion, gotoPreviousQuestion } from "../actions";
import { questionBank } from "../QuestionBank";
import { bukvarkoApp, initializeState } from "../reducers";

it("initializes the current question to the first question.", () => {
  const state = initializeState();

  expect(state.currentQuestion).toBe(questionBank.questions[0].id);
});

it("selects the second question on gotoNextQuestion upon initialization.", () => {
  if (questionBank.questions.length > 1) {
    const state = bukvarkoApp(undefined, gotoNextQuestion());

    expect(state.currentQuestion).toBe(questionBank.questions[1].id);
  }
});

it("selects the last question on gotoNextQuestion upon initialization.", () => {
  const state = bukvarkoApp(undefined, gotoPreviousQuestion());

  expect(state.currentQuestion).toBe(
    questionBank.questions[questionBank.questions.length - 1].id
  );
});
