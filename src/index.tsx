import 'typeface-roboto';

import { createBrowserHistory } from 'history';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './components/App';
import * as dependency from './dependency';
import * as i18n from './i18n';
import * as question from './question';
import * as select from './select';
import * as storeFactory from './storeFactory';

const deps: dependency.Registry = dependency.initializeRegistry(
  question.initializeBank(),
  speechSynthesis,
  i18n.initializeTranslations(),
  localStorage,
  createBrowserHistory(),
);

const store = storeFactory.produce(deps);

const selectWithDeps = new select.WithDeps(deps);

render(
  <Provider store={store}>
    <select.Context.Provider value={selectWithDeps}>
      <i18n.Context.Provider value={deps.translations}>
        <App />
      </i18n.Context.Provider>
    </select.Context.Provider>
  </Provider>,
  document.getElementById('root'),
);
