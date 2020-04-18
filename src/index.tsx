import 'typeface-roboto';

import { LinearProgress } from '@material-ui/core';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import { App } from './components/App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Unfortunately } from './components/Unfortunately';
import * as dependency from './dependency';
import * as i18n from './i18n';
import * as question from './question';
import * as select from './select';
import * as storeFactory from './storeFactory';

interface Ingredients {
  deps: dependency.Registry;
  store: Store;
  selectWithDeps: select.WithDeps;
}

function promiseIngredients(): Promise<Ingredients> {
  // Remark (Marko Ristin, 2020-04-18): Since the voices might change *while* the application is running,
  // voices should be integrated in the application state. This is left to a future version as it is hardly
  // a real issue at the moment.

  return new Promise((resolve, _) => {
    // This is necessary since Chrome needs to load the voices, while other browsers just return the getVoices.
    if ((window as any).chrome && 'onvoiceschanged' in speechSynthesis) {
      speechSynthesis.onvoiceschanged = () => {
        console.info('voiceschanged event fired.');
        resolve();
      };
    } else {
      // Wait for half a second. Firefox seemed to have problems loading the voices.
      setTimeout(() => {
        resolve();
      }, 2000);
    }
  }).then(() => {
    const deps = dependency.initializeRegistry(
      question.initializeBank(),
      speechSynthesis,
      i18n.initializeTranslations(),
      localStorage,
      createBrowserHistory(),
    );

    const store = storeFactory.produce(deps);

    const selectWithDeps = new select.WithDeps(deps);

    console.info('All we need has been initialized.');

    return { deps, store, selectWithDeps };
  });
}

function Main() {
  const [ingredients, setIngredients] = useState<Ingredients | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (ingredients === undefined && error === undefined) {
      promiseIngredients()
        .then((youNeed) => setIngredients(youNeed))
        .catch((e: Error) => {
          setError(e.toString());
        });
    }
  });

  if (error !== undefined) {
    return <Unfortunately error={error} />;
  } else {
    if (ingredients !== undefined) {
      return (
        <Provider store={ingredients.store}>
          <select.Context.Provider value={ingredients.selectWithDeps}>
            <i18n.Context.Provider value={ingredients.deps.translations}>
              <App />
            </i18n.Context.Provider>
          </select.Context.Provider>
        </Provider>
      );
    } else {
      return <LinearProgress />;
    }
  }
}

render(
  <ErrorBoundary>
    <Main />
  </ErrorBoundary>,
  document.getElementById('root'),
);
