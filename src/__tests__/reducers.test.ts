import * as effect from "../effect";
import * as storeFactory from "../storeFactory";
import * as mockDependency from "./mockDependency";

const deps = mockDependency.registry;

it("initializes the current question to the first question.", () => {
  const store = storeFactory.produce(deps);

  expect(store.getState().currentQuestion).toBe(
    deps.questionBank.questions[0].id
  );
});

it("selects the second question on going forward upon initialization.", () => {
  const store = storeFactory.produce(deps);
  store.dispatch(effect.nextQuestion() as any);

  if (deps.questionBank.questions.length > 1) {
    expect(store.getState().currentQuestion).toBe(
      deps.questionBank.questions[1].id
    );
  }
});

it("selects the last question on going backwards upon initialization.", () => {
  const store = storeFactory.produce(deps);
  store.dispatch(effect.previousQuestion() as any);

  if (deps.questionBank.questions.length > 0) {
    expect(store.getState().currentQuestion).toBe(
      deps.questionBank.questions[deps.questionBank.questions.length - 1].id
    );
  }
});
