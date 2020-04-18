import * as app from '../app';
import * as effect from '../effect';
import * as select from '../select';
import * as storeFactory from '../storeFactory';
import * as mockDependency from './mockDependency';

it('selects no hits on initial state.', () => {
  const deps = mockDependency.initializeRegistry();
  const state: app.State = app.initializeState(deps);

  const selectWithDeps = new select.WithDeps(deps);

  const hitsAndIDs = selectWithDeps.hitsIDs(state);
  const hits = hitsAndIDs.map(([hit, _]) => hit);

  expect(hits).toEqual(deps.questionBank.questions.map((_) => false));
});

it('selects hits on all correct answers.', () => {
  const deps = mockDependency.initializeRegistry();
  // Mock the translation to always return that the answer is a correct one.
  for (const translation of deps.translations.values()) {
    for (const q of deps.questionBank.questions) {
      (translation.answerCheckers as any)[q.id] = () => true;
    }
  }

  const selectWithDeps = new select.WithDeps(deps);

  const state: app.State = {
    ...app.initializeState(deps),
  };

  const hitsAndIDs = selectWithDeps.hitsIDs(state);
  const hits = hitsAndIDs.map(([hit, _]) => hit);

  expect(hits).toEqual(deps.questionBank.questions.map((_) => true));
});

it('selects first question on initial state.', () => {
  const deps = mockDependency.initializeRegistry();
  const state: app.State = app.initializeState(deps);

  const selectWithDeps = new select.WithDeps(deps);

  const currentIndex = selectWithDeps.currentIndex(state);

  expect(currentIndex).toBe(0);
});

it('selects the second question on next question upon initialization.', () => {
  const deps = mockDependency.initializeRegistry();
  if (deps.questionBank.questions.length > 1) {
    const store = storeFactory.produce(deps);
    store.dispatch(effect.nextQuestion() as any);

    const selectWithDeps = new select.WithDeps(deps);

    const currentIndex = selectWithDeps.currentIndex(store.getState());

    expect(currentIndex).toBe(1);
  }
});

it('selects the last question on previous question upon initialization.', () => {
  const deps = mockDependency.initializeRegistry();
  const store = storeFactory.produce(deps);
  store.dispatch(effect.previousQuestion() as any);

  const selectWithDeps = new select.WithDeps(deps);

  const currentIndex = selectWithDeps.currentIndex(store.getState());

  expect(currentIndex).toBe(deps.questionBank.questions.length - 1);
});
