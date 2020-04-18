import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';

import { App } from '../../components/App';
import * as i18n from '../../i18n';
import * as select from '../../select';
import * as storeFactory from '../../storeFactory';
import * as mockDependency from '../mockDependency';

function setupAndRenderApp() {
  const deps = mockDependency.initializeRegistry();
  const store = storeFactory.produce(deps);
  const selectWithDeps: select.WithDeps = new select.WithDeps(deps);

  return {
    rendered: render(
      <Provider store={store}>
        <select.Context.Provider value={selectWithDeps}>
          <i18n.Context.Provider value={deps.translations}>
            <App />
          </i18n.Context.Provider>
        </select.Context.Provider>
      </Provider>,
    ),
    store,
    selectWithDeps,
  };
}

it('renders without problems.', () => {
  setupAndRenderApp();
});

it('changes image on next question.', () => {
  const { rendered } = setupAndRenderApp();

  const questionImage = rendered.getByAltText('question image') as HTMLImageElement;
  const oldSrc = questionImage.src;

  fireEvent.click(rendered.getByTestId('nextQuestion'));

  expect(questionImage.src).not.toBe(oldSrc);
});

it('changes image on previous question.', () => {
  const { rendered } = setupAndRenderApp();

  const questionImage = rendered.getByAltText('question image') as HTMLImageElement;
  const oldSrc = questionImage.src;

  fireEvent.click(rendered.getByTestId('previousQuestion'));

  expect(questionImage.src).not.toBe(oldSrc);
});

it('handles the correct answer without problems.', () => {
  const { rendered, store, selectWithDeps } = setupAndRenderApp();

  const translation = selectWithDeps.resolveTranslation(store.getState());
  const expectedAnswer = translation.answerCheckers[store.getState().currentQuestion];

  fireEvent.change(rendered.getByTestId('answer'), {
    target: { value: expectedAnswer },
  });
});

it('handles an incorrect answer without problems.', () => {
  const { rendered, store, selectWithDeps } = setupAndRenderApp();

  const translation = selectWithDeps.resolveTranslation(store.getState());
  const expectedAnswer = translation.answerCheckers[store.getState().currentQuestion];

  fireEvent.change(rendered.getByTestId('answer'), {
    target: {
      value: 'incorrect ' + expectedAnswer,
    },
  });
});
