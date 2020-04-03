import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { GOTO_PREVIOUS_QUESTION } from "../../actions";
import { PreviousQuestion } from "../../components/PreviousQuestion";
import { bukvarkoApp } from "../../reducers";

it("dispatches the action.", () => {
  const store = createStore(bukvarkoApp);
  const mockDispatch = jest.fn();
  store.dispatch = mockDispatch;

  const rendered = render(
    <Provider store={store}>
      <PreviousQuestion />
    </Provider>
  );

  fireEvent.click(rendered.getByTestId("previousQuestion"));
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(mockDispatch.mock.calls[0][0].type).toBe(GOTO_PREVIOUS_QUESTION);
});
