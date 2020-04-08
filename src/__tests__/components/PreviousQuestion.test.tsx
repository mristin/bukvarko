import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import configureMockFactory from "redux-mock-store";
import thunk from "redux-thunk";

import { ASK_TO_REFOCUS } from "../../actions";
import { PreviousQuestion } from "../../components/PreviousQuestion";
import * as thunks from "../../thunks";

jest.mock("../../thunks");

it("provokes the state change.", async () => {
  const store = configureMockFactory([thunk])();

  const mockDispatch = jest.fn();
  store.dispatch = mockDispatch;

  const dummy = { hello: 1 };

  (thunks.previousQuestion as any).mockResolvedValue(dummy);

  const rendered = render(
    <Provider store={store}>
      <PreviousQuestion />
    </Provider>
  );

  fireEvent.click(rendered.getByTestId("previousQuestion"));

  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(await mockDispatch.mock.calls[0][0]).toBe(dummy);
  expect(mockDispatch.mock.calls[1][0].type).toBe(ASK_TO_REFOCUS);
});
