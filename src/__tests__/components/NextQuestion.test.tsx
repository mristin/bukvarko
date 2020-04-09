import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import configureMockFactory from "redux-mock-store";
import thunk from "redux-thunk";

import * as action from "../../action";
import { NextQuestion } from "../../components/NextQuestion";
import * as effect from "../../effect";

jest.mock("../../effect");

it("dispatches the action.", async () => {
  const store = configureMockFactory([thunk])();

  const mockDispatch = jest.fn();
  store.dispatch = mockDispatch;

  const dummy = { hello: 1 };

  (effect.nextQuestion as any).mockResolvedValue(dummy);

  const rendered = render(
    <Provider store={store}>
      <NextQuestion />
    </Provider>
  );

  fireEvent.click(rendered.getByTestId("nextQuestion"));

  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(await mockDispatch.mock.calls[0][0]).toBe(dummy);
  expect(mockDispatch.mock.calls[1][0].type).toBe(action.ASK_TO_REFOCUS);
});
