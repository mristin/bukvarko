import { Select } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/Settings";
import * as React from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import * as action from "../action";
import * as i18n from "../i18n";
import * as reducer from "../reducer";
import * as select from "../select";
import * as speech from "../speech";

function handleLanguageChange(e: any, dispatch: Dispatch<any>) {
  const lang: i18n.LanguageID = e.target.value;
  dispatch(action.changeTranslation(lang));
}

function handleVoiceChange(e: any, dispatch: Dispatch) {
  const voice = speech.voiceIDFromKey(e.target.value);
  dispatch(action.changeVoice(voice));
}

function ChooseYourLanguageLabel(props: {
  langs: i18n.LanguageID[];
  translations: i18n.Translations;
}) {
  return (
    <>
      {props.langs.map((lang, i) => {
        const translation = props.translations.get(lang)!;

        return (
          <div key={lang} style={{ marginTop: "0.5em" }}>
            {i < props.langs.length - 1
              ? translation.chooseYourLanguage + " /"
              : translation.chooseYourLanguage + ":"}
          </div>
        );
      })}
    </>
  );
}

function ChooseYourLanguage(props: {
  langs: i18n.LanguageID[];
  translations: i18n.Translations;
  currentTranslation: i18n.LanguageID;
}) {
  const dispatch = useDispatch();

  return (
    <Select
      style={{ marginTop: "1em" }}
      value={props.currentTranslation}
      onChange={(e) => handleLanguageChange(e, dispatch)}
      data-testid="chooseYourLanguage"
    >
      {props.langs.map((lang) => {
        const translation = props.translations.get(lang)!;
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
    return (
      <span style={{ fontStyle: "italic" }}>
        {props.translation.noVoiceAvailable}
      </span>
    );
  }

  return (
    <>
      <div>{props.translation.chooseYourVoice}:</div>
      <Select
        style={{ marginTop: "1em" }}
        value={props.currentVoice ? [props.currentVoice.toKey()] : undefined}
        onChange={(e) => handleVoiceChange(e, dispatch)}
        inputProps={{
          "data-testid": "chooseYourVoice",
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
    throw Error("Expected i18n context to be set.");
  }

  const selectContext = useContext(select.Context);
  if (selectContext === undefined) {
    throw Error("Expected selector context to be set.");
  }

  const preferencesVisible = useSelector(
    (s: reducer.State) => s.preferencesVisible
  );

  const dispatch = useDispatch();

  const langs: i18n.LanguageID[] = [...i18nContext.keys()].sort();

  const currentTranslation: i18n.LanguageID = useSelector(
    (s: reducer.State) => s.language
  );
  const translation = i18nContext.get(currentTranslation)!;

  const availableVoices = useSelector((s: reducer.State) =>
    selectContext.availableVoices(s)
  );
  const currentVoice = useSelector((s: reducer.State) => s.voice);

  return (
    <Drawer
      anchor={"left"}
      open={preferencesVisible}
      onClose={() => dispatch(action.togglePreferences(false))}
    >
      <div style={{ padding: "1em", width: "20em" }}>
        <div style={{ textAlign: "center" }}>
          <SettingsIcon style={{ fontSize: "3em" }} />
        </div>

        <ChooseYourLanguageLabel langs={langs} translations={i18nContext} />

        <ChooseYourLanguage
          langs={langs}
          translations={i18nContext}
          currentTranslation={currentTranslation}
        />

        <div style={{ marginTop: "3em" }}>
          <ChooseYourVoice
            currentVoice={currentVoice}
            availableVoices={availableVoices}
            translation={translation}
          />
        </div>
      </div>
    </Drawer>
  );
}
