import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";

import { App } from "../../components/App";
import * as select from "../../select";
import * as storeFactory from "../../storeFactory";
import * as mockDependency from "../mockDependency";

const deps = mockDependency.register;

function renderApp() {
  const store = storeFactory.produce(deps);
  const selectWithDeps = new select.WithDeps(deps);

  return render(
    <Provider store={store}>
      <select.Context.Provider value={selectWithDeps}>
        <App />
      </select.Context.Provider>
    </Provider>
  );
}

it("renders without problems.", () => {
  renderApp();
});

it("changes image on next question.", () => {
  const rendered = renderApp();

  const questionImage = rendered.getByAltText(
    "question image"
  ) as HTMLImageElement;
  const oldSrc = questionImage.src;

  fireEvent.click(rendered.getByTestId("nextQuestion"));

  expect(questionImage.src).not.toBe(oldSrc);
});

it("changes image on previous question.", () => {
  const rendered = renderApp();

  const questionImage = rendered.getByAltText(
    "question image"
  ) as HTMLImageElement;
  const oldSrc = questionImage.src;

  fireEvent.click(rendered.getByTestId("previousQuestion"));

  expect(questionImage.src).not.toBe(oldSrc);
});

it("handles correct answers without problems.", () => {
  const rendered = renderApp();

  fireEvent.change(rendered.getByTestId("answer"), {
    target: { value: deps.questionBank.questions[0].expectedAnswer },
  });
});

it("handles incorrect answers without problems.", () => {
  const rendered = renderApp();

  fireEvent.change(rendered.getByTestId("answer"), {
    target: {
      value: "incorrect " + deps.questionBank.questions[0].expectedAnswer,
    },
  });
});
