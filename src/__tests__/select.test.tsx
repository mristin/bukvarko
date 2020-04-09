import * as effects from "../effects";
import { QuestionID, questionBank } from "../QuestionBank";
import * as reducer from "../reducer";
import * as select from "../select";
import * as storeFactory from "../storeFactory";

const deps = { questionBank };

it("selects no hits on initial state.", () => {
  const state: reducer.State = reducer.initializeState(deps);

  const selectWithDeps = new select.WithDeps(deps);

  const hitsAndIDs = selectWithDeps.hitsIDs(state);
  const hits = hitsAndIDs.map(([hit, _]) => hit);

  expect(hits).toEqual(deps.questionBank.questions.map((_) => false));
});

it("selects hits on all correct answers.", () => {
  const answers = new Map<QuestionID, string>();
  for (const q of deps.questionBank.questions) {
    answers.set(q.id, q.expectedAnswer);
  }

  const state: reducer.State = {
    ...reducer.initializeState(deps),
    answers,
  };

  const selectWithDeps = new select.WithDeps(deps);

  const hitsAndIDs = selectWithDeps.hitsIDs(state);
  const hits = hitsAndIDs.map(([hit, _]) => hit);

  expect(hits).toEqual(deps.questionBank.questions.map((_) => true));
});

it("selects first question on initial state.", () => {
  const state: reducer.State = reducer.initializeState(deps);

  const selectWithDeps = new select.WithDeps(deps);

  const currentIndex = selectWithDeps.currentIndex(state);

  expect(currentIndex).toBe(0);
});

it("selects the second question on next question upon initialization.", () => {
  if (deps.questionBank.questions.length > 1) {
    const store = storeFactory.produce(deps);
    store.dispatch(effects.nextQuestion() as any);

    const selectWithDeps = new select.WithDeps(deps);

    const currentIndex = selectWithDeps.currentIndex(store.getState());

    expect(currentIndex).toBe(1);
  }
});

it("selects the last question on previous question upon initialization.", () => {
  const store = storeFactory.produce(deps);
  store.dispatch(effects.previousQuestion() as any);

  const selectWithDeps = new select.WithDeps(deps);

  const currentIndex = selectWithDeps.currentIndex(store.getState());

  expect(currentIndex).toBe(deps.questionBank.questions.length - 1);
});
