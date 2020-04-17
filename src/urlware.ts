import { History } from 'history';
import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux';

import * as action from './action';
import * as app from './app';
import * as i18n from './i18n';

function withoutHashPrefix(value: string): string {
  if (value.startsWith('#')) {
    return value.slice(1);
  }
  return value;
}

export function create(history: History) {
  const middleware: Middleware = (api: MiddlewareAPI<Dispatch, app.State>) => (next: Dispatch) => (action: Action) => {
    const prevLanguage = api.getState().language;

    const result = next(action);

    if (prevLanguage !== api.getState().language) {
      history.push({ hash: `#${api.getState().language}` });
    }

    return result;
  };

  return middleware;
}

export function connectDispatch(history: History, dispatch: Dispatch<action.Action>, translations: i18n.Translations) {
  history.listen((locationState) => {
    const lang = withoutHashPrefix(locationState.hash);
    if (translations.has(lang as i18n.LanguageID)) {
      dispatch(action.changeTranslation(lang as i18n.LanguageID));
    }
  });

  const lang = withoutHashPrefix(history.location.hash);
  if (translations.has(lang as i18n.LanguageID)) {
    dispatch(action.changeTranslation(lang as i18n.LanguageID));
  }
}
