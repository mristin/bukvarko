import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";

import { ASK_TO_REFOCUS, GOTO_PREVIOUS_QUESTION } from "../../actions";
import { PreviousQuestion } from "../../components/PreviousQuestion";
import * as storeFactory from "../../storeFactory";

it("dispatches the action.", () => {
  const store = storeFactory.produce();
  const mockDispatch = jest.fn();
  store.dispatch = mockDispatch;

  const rendered = render(
    <Provider store={store}>
      <PreviousQuestion />
    </Provider>
  );

  fireEvent.click(rendered.getByTestId("previousQuestion"));
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(mockDispatch.mock.calls[0][0].type).toBe(GOTO_PREVIOUS_QUESTION);
  expect(mockDispatch.mock.calls[1][0].type).toBe(ASK_TO_REFOCUS);
});
