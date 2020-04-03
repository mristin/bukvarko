import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { ASK_TO_REFOCUS, GOTO_NEXT_QUESTION } from "../../actions";
import { NextQuestion } from "../../components/NextQuestion";
import { bukvarkoApp } from "../../reducers";

it("dispatches the action.", () => {
  const store = createStore(bukvarkoApp);
  const mockDispatch = jest.fn();
  store.dispatch = mockDispatch;

  const rendered = render(
    <Provider store={store}>
      <NextQuestion />
    </Provider>
  );

  fireEvent.click(rendered.getByTestId("nextQuestion"));
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(mockDispatch.mock.calls[0][0].type).toBe(GOTO_NEXT_QUESTION);
  expect(mockDispatch.mock.calls[1][0].type).toBe(ASK_TO_REFOCUS);
});
