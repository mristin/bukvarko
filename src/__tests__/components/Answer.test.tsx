import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockFactory from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as action from '../../action';
import { Answer } from '../../components/Answer';
import * as effect from '../../effect';

jest.mock('../../effect');

function setUp() {
  const store = configureMockFactory([thunk])({
    focusPending: true,
    answers: new Map(),
  });

  const mockDispatch = jest.fn();
  store.dispatch = mockDispatch;

  const rendered = render(
    <Provider store={store}>
      <Answer />
    </Provider>,
  );

  return { store, mockDispatch, rendered };
}

it('dispatches ACK_REFOCUS when focus pending.', () => {
  const { mockDispatch } = setUp();

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(mockDispatch.mock.calls[0][0].type).toEqual(action.ACK_REFOCUS);
});

it('dispatches the change actions.', () => {
  const { mockDispatch, rendered } = setUp();

  fireEvent.change(rendered.getByTestId('answer'), {
    target: { value: 'some answer' },
  });

  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(mockDispatch.mock.calls[0][0].type).toEqual(action.ACK_REFOCUS);
  expect(mockDispatch.mock.calls[1][0]).toEqual(action.changeAnswer('some answer'));
});

it('speaks when enter is pressed.', async () => {
  const { mockDispatch, rendered } = setUp();

  const dummy = { hello: 1 };

  (effect.speak as any).mockResolvedValue(dummy);

  fireEvent.keyUp(rendered.getByTestId('answer'), { key: 'Enter' });

  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(mockDispatch.mock.calls[0][0].type).toBe(action.ACK_REFOCUS);
  expect(await mockDispatch.mock.calls[1][0]).toBe(dummy);
});
