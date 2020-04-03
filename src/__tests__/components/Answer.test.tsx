import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { ACK_REFOCUS, changeAnswer } from "../../actions";
import { Answer } from "../../components/Answer";
import { bukvarkoApp } from "../../reducers";

it("dispatches ACK_REFOCUS on initialization.", () => {
  const store = createStore(bukvarkoApp);
  const mockDispatch = jest.fn();
  store.dispatch = mockDispatch;

  render(
    <Provider store={store}>
      <Answer />
    </Provider>
  );

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(mockDispatch.mock.calls[0][0].type).toEqual(ACK_REFOCUS);
});

it("dispatches the actions.", () => {
  const store = createStore(bukvarkoApp);
  const mockDispatch = jest.fn();
  store.dispatch = mockDispatch;

  const rendered = render(
    <Provider store={store}>
      <Answer />
    </Provider>
  );

  fireEvent.change(rendered.getByTestId("answer"), {
    target: { value: "some answer" },
  });

  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(mockDispatch.mock.calls[0][0].type).toEqual(ACK_REFOCUS);
  expect(mockDispatch.mock.calls[1][0]).toEqual(changeAnswer("some answer"));
});
