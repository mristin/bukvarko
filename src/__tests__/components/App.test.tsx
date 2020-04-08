import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";

import { App } from "../../components/App";
import { questionBank } from "../../QuestionBank";
import * as storeFactory from "../../storeFactory";

function renderApp() {
  const store = storeFactory.produce({ questionBank });

  return render(
    <Provider store={store}>
      <App />
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
    target: { value: questionBank.questions[0].expectedAnswer },
  });
});

it("handles incorrect answers without problems.", () => {
  const rendered = renderApp();

  fireEvent.change(rendered.getByTestId("answer"), {
    target: { value: "incorrect " + questionBank.questions[0].expectedAnswer },
  });
});
