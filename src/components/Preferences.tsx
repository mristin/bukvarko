import { Select } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import ButtonIcon from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import * as React from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as action from '../action';
import * as app from '../app';
import * as i18n from '../i18n';
import * as select from '../select';
import * as speech from '../speech';

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
      onChange={(e) => {
        const lang = e.target.value as i18n.LanguageID;
        dispatch(action.changeTranslation(lang));
      }}
      data-testid="chooseYourLanguage"
    >
      {props.languages.map((lang) => {
        const translation = props.translations.get(lang);
        if (translation === undefined) {
          throw Error(`The translation for the language is unexpectedly missing: ${lang}`);
        }

        return (
          <MenuItem key={lang} value={lang}>
            {translation.languageName} ({lang})
          </MenuItem>
        );
      })}
    </Select>
  );
}

function ChooseYourVoice(props: {
  currentVoice: speech.VoiceID | undefined;
  availableVoices: Array<speech.VoiceID>;
  language: i18n.LanguageID;
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
        onChange={(e) => {
          const voice = speech.voiceIDFromKey(e.target.value as string);
          dispatch(action.changeVoice(props.language, voice));
        }}
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
  const currentVoice = useSelector((s: app.State) => s.voiceByLanguage.get(s.language));

  return (
    <Drawer anchor={'left'} open={preferencesVisible} onClose={() => dispatch(action.togglePreferences(false))}>
      <div style={{ padding: '1em', width: '18em' }}>
        <div style={{ textAlign: 'center' }}>
          <ButtonIcon onClick={() => dispatch(action.togglePreferences(false))}>
            <SettingsIcon style={{ fontSize: '3em' }} />
          </ButtonIcon>
        </div>

        <div style={{ marginTop: '0.5em' }}>{translation.chooseYourLanguage}</div>

        <ChooseYourLanguage languages={languages} translations={i18nContext} language={language} />

        <div style={{ marginTop: '3em' }}>
          <ChooseYourVoice
            currentVoice={currentVoice}
            availableVoices={availableVoices}
            language={language}
            translation={translation}
          />
        </div>
      </div>
    </Drawer>
  );
}
