import { gotoNextQuestion, gotoPreviousQuestion } from "../actions";
import { QuestionID, questionBank } from "../QuestionBank";
import { State, bukvarkoApp, initializeState } from "../reducers";
import { selectCurrentIndex, selectHitsIDs } from "../selectors";

it("selects no hits on initial state.", () => {
  const state: State = initializeState();

  const hitsAndIDs = selectHitsIDs(state);
  const hits = hitsAndIDs.map(([hit, _]) => hit);

  expect(hits).toEqual(questionBank.questions.map((_) => false));
});

it("selects hits on all correct answers.", () => {
  const answers = new Map<QuestionID, string>();
  for (const q of questionBank.questions) {
    answers.set(q.id, q.expectedAnswer);
  }

  const state: State = {
    ...initializeState(),
    answers,
  };

  const hitsAndIDs = selectHitsIDs(state);
  const hits = hitsAndIDs.map(([hit, _]) => hit);

  expect(hits).toEqual(questionBank.questions.map((_) => true));
});

it("selects first question on initial state.", () => {
  const state: State = initializeState();
  const currentIndex = selectCurrentIndex(state);

  expect(currentIndex).toBe(0);
});

it("selects the second question on next question upon initialization.", () => {
  if (questionBank.questions.length > 1) {
    const state = bukvarkoApp(undefined, gotoNextQuestion());

    const currentIndex = selectCurrentIndex(state);

    expect(currentIndex).toBe(1);
  }
});

it("selects the last question on previous question upon initialization.", () => {
  const state = bukvarkoApp(undefined, gotoPreviousQuestion());

  const currentIndex = selectCurrentIndex(state);

  expect(currentIndex).toBe(questionBank.questions.length - 1);
});
