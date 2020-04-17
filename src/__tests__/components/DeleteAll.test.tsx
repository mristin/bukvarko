import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockFactory from 'redux-mock-store';

import * as action from '../../action';
import { DeleteAll } from '../../components/DeleteAll';

it('dispatches the action.', async () => {
  const store = configureMockFactory()();

  const mockDispatch = jest.fn();
  store.dispatch = mockDispatch;

  const rendered = render(
    <Provider store={store}>
      <DeleteAll />
    </Provider>,
  );

  fireEvent.click(rendered.getByTestId('deleteAll'));

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(mockDispatch.mock.calls[0][0].type).toBe(action.DELETE_ALL);
});
