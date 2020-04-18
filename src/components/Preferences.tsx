import { Select } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import * as React from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import * as action from '../action';
import * as app from '../app';
import * as i18n from '../i18n';
import * as select from '../select';
import * as speech from '../speech';

function handleLanguageChange(e: any, dispatch: Dispatch<any>) {
  const lang: i18n.LanguageID = e.target.value;
  dispatch(action.changeTranslation(lang));
}

function handleVoiceChange(e: any, dispatch: Dispatch) {
  const voice = speech.voiceIDFromKey(e.target.value);
  dispatch(action.changeVoice(voice));
}

function ChooseYourLanguage(props: {
  languages: i18n.LanguageID[];
  translations: i18n.Translations;
  language: i18n.LanguageID;
}) {
  const dispatch = useDispatch();

  return (
    <Select
      style={{ marginTop: '1em' }}
      value={props.language}
      onChange={(e) => handleLanguageChange(e, dispatch)}
      data-testid="chooseYourLanguage"
    >
      {props.languages.map((lang) => {
        const translation = props.translations.get(lang);
        if (translation === undefined) {
          throw Error(`The translation for the language is unexpectedly missing: ${lang}`);
        }

        return (
          <MenuItem key={lang} value={lang}>
            {translation.languageName}
          </MenuItem>
        );
      })}
    </Select>
  );
}

function ChooseYourVoice(props: {
  currentVoice: speech.VoiceID | undefined;
  availableVoices: Array<speech.VoiceID>;
  translation: i18n.Translation;
}) {
  const dispatch = useDispatch();

  if (props.availableVoices.length === 0) {
    return <span style={{ fontStyle: 'italic' }}>{props.translation.noVoiceAvailable}</span>;
  }

  return (
    <>
      <div>{props.translation.chooseYourVoice}:</div>
      <Select
        style={{ marginTop: '1em' }}
        value={props.currentVoice ? [props.currentVoice.toKey()] : undefined}
        onChange={(e) => handleVoiceChange(e, dispatch)}
        inputProps={{
          'data-testid': 'chooseYourVoice',
        }}
      >
        {props.availableVoices.map((voice) => (
          <MenuItem key={voice.toKey()} value={voice.toKey()}>
            {voice.name} ({voice.lang})
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

export function Preferences() {
  const i18nContext: i18n.Translations | undefined = useContext(i18n.Context);
  if (i18nContext === undefined) {
    throw Error('Expected i18n context to be set.');
  }

  const selectContext = useContext(select.Context);
  if (selectContext === undefined) {
    throw Error('Expected selector context to be set.');
  }

  const preferencesVisible = useSelector((s: app.State) => s.preferencesVisible);

  const dispatch = useDispatch();

  const languages: i18n.LanguageID[] = [...i18nContext.keys()].sort();

  const language: i18n.LanguageID = useSelector((s: app.State) => s.language);
  const translation = i18nContext.get(language);
  if (translation === undefined) {
    throw Error(`No translation available in the i18n context for the language: ${language}`);
  }

  const availableVoices = useSelector((s: app.State) => selectContext.availableVoices(s));
  const currentVoice = useSelector((s: app.State) => s.voice);

  return (
    <Drawer anchor={'left'} open={preferencesVisible} onClose={() => dispatch(action.togglePreferences(false))}>
      <div style={{ padding: '1em', width: '18em' }}>
        <div style={{ textAlign: 'center' }}>
          <SettingsIcon style={{ fontSize: '3em' }} />
        </div>

        <div style={{ marginTop: '0.5em' }}>{translation.chooseYourLanguage}</div>

        <ChooseYourLanguage languages={languages} translations={i18nContext} language={language} />

        <div style={{ marginTop: '3em' }}>
          <ChooseYourVoice currentVoice={currentVoice} availableVoices={availableVoices} translation={translation} />
        </div>
      </div>
    </Drawer>
  );
}
