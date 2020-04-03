import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { Action, changeAnswer } from "../../actions";
import { Answer } from "../../components/Answer";
import { bukvarkoApp } from "../../reducers";

it("dispatches the action.", () => {
  const store = createStore(bukvarkoApp);
  const mockDispatch = jest.fn();
  store.dispatch = mockDispatch;

  const rendered = render(
    <Provider store={store}>
      <Answer refocusEl={React.createRef<HTMLInputElement>()}/>
    </Provider>
  );

  fireEvent.change(rendered.getByTestId("answer"), {
    target: { value: "some answer" },
  });
  expect(mockDispatch).toHaveBeenCalledTimes(1);

  const action: Action = mockDispatch.mock.calls[0][0];

  expect(action).toEqual(changeAnswer("some answer"));
});
