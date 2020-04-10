import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import configureMockFactory from "redux-mock-store";
import thunk from "redux-thunk";

import * as action from "../../action";
import { Speaker } from "../../components/Speaker";
import * as effect from "../../effect";

jest.mock("../../effect");

it("dispatches the actions and effects.", async () => {
  const store = configureMockFactory([thunk])();

  const mockDispatch = jest.fn();
  store.dispatch = mockDispatch;

  const dummy = { hello: 1 };

  (effect.speak as any).mockResolvedValue(dummy);

  const rendered = render(
    <Provider store={store}>
      <Speaker />
    </Provider>
  );

  fireEvent.click(rendered.getByTestId("speak"));

  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(await mockDispatch.mock.calls[0][0]).toBe(dummy);
  expect(mockDispatch.mock.calls[1][0].type).toBe(action.ASK_TO_REFOCUS);
});
