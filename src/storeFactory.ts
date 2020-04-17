import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import * as app from './app';
import * as autosave from './autosave';
import * as dependency from './dependency';
import * as stateInvariants from './stateInvariants';
import * as urlware from './urlware';

export function produce(deps: dependency.Registry) {
  const store = createStore(
    app.createReducer(deps),
    applyMiddleware(
      stateInvariants.create(deps),
      autosave.create(deps),
      urlware.create(deps.history),
      thunk.withExtraArgument(deps),
    ),
  );

  urlware.connectDispatch(deps.history, (a) => store.dispatch(a), deps.translations);

  return store;
}
