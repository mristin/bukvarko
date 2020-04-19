import * as action from '../action';
import * as app from '../app';
import * as i18n from '../i18n';
import * as speech from '../speech';
import * as storeFactory from '../storeFactory';
import * as mockDependency from './mockDependency';

it('does not patch anything from an initial state on empty storage.', () => {
  const deps = mockDependency.initializeRegistry();
  const store = storeFactory.produce(deps);

  // Load
  const state = app.initializeState(deps);

  // Loaded state should equal the state in the memory.
  expect(state).toEqual(store.getState());
});

it('stores the language, voice and voiceByLanguage on language change.', () => {
  const deps = mockDependency.initializeRegistry();
  const store = storeFactory.produce(deps);

  // Act
  store.dispatch(action.changeTranslation(i18n.SERBIAN));

  // Load
  const state = app.initializeState(deps);

  // Loaded state should equal the state in the memory.
  expect(state).toEqual(store.getState());
});

it('stores the new voice and the last voice on voice change.', () => {
  const deps = mockDependency.initializeRegistry();
  const store = storeFactory.produce(deps);

  // Act
  store.dispatch(action.changeVoice(i18n.ENGLISH, new speech.VoiceID('en-US', 'Barbara')));

  // Load
  const state = app.initializeState(deps);

  // Loaded state should equal the state in the memory.
  expect(state).toEqual(store.getState());
});
