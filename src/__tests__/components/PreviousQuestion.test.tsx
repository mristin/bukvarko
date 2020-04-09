import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import configureMockFactory from "redux-mock-store";
import thunk from "redux-thunk";

import * as action from "../../action";
import { PreviousQuestion } from "../../components/PreviousQuestion";
import * as effect from "../../effect";

jest.mock("../../effect");

it("provokes the state change.", async () => {
  const store = configureMockFactory([thunk])();

  const mockDispatch = jest.fn();
  store.dispatch = mockDispatch;

  const dummy = { hello: 1 };

  (effect.previousQuestion as any).mockResolvedValue(dummy);

  const rendered = render(
    <Provider store={store}>
      <PreviousQuestion />
    </Provider>
  );

  fireEvent.click(rendered.getByTestId("previousQuestion"));

  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(await mockDispatch.mock.calls[0][0]).toBe(dummy);
  expect(mockDispatch.mock.calls[1][0].type).toBe(action.ASK_TO_REFOCUS);
});
