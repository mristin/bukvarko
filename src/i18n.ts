import * as React from "react";

import * as bcp47 from "./bcp47";
import * as question from "./question";

export type ExpectedAnswers = {
  readonly [_ in question.ID]: string;
};

export interface Translation {
  chooseYourLanguage: string;
  languageName: string;
  chooseYourVoice: string;
  noVoiceAvailable: string;
  expectedAnswers: ExpectedAnswers;
  hereItSays: string;
  nothingIsWrittenHere: string;
  questionImageAlt: string;
}

const serbian: Translation = {
  chooseYourLanguage: "Jezik",
  languageName: "Srpski",
  chooseYourVoice: "Glas",
  noVoiceAvailable: "Sistem ne podržava glas za ovaj jezik.",
  expectedAnswers: {
    elephant: "slon",
    tiger: "tigar",
    lion: "lav",
    dog: "pas",
  },
  hereItSays: "Ovde piše",
  nothingIsWrittenHere: "Ovde ništa ne piše.",
  questionImageAlt: "slika-pitanje",
};
export const SERBIAN = "sr";

const croatian: Translation = {
  chooseYourLanguage: "Jezik",
  languageName: "Hrvatski",
  chooseYourVoice: "Glas",
  noVoiceAvailable: "Sustav ne podržava glas za ovaj jezik.",
  expectedAnswers: {
    elephant: "slon",
    tiger: "tigar",
    lion: "lav",
    dog: "pas",
  },
  hereItSays: "Ovdje piše",
  nothingIsWrittenHere: "Ovdje ništa ne piše.",
  questionImageAlt: "slika-pitanje",
};
export const CROATIAN = "hr";

const english: Translation = {
  chooseYourLanguage: "Language",
  languageName: "English",
  chooseYourVoice: "Voice",
  noVoiceAvailable: "Your system does not provide a voice for this language.",
  expectedAnswers: {
    elephant: "elephant",
    tiger: "tiger",
    lion: "lion",
    dog: "dog",
  },
  hereItSays: "Here it says",
  nothingIsWrittenHere: "Nothing has been written.",
  questionImageAlt: "question image",
};
export const ENGLISH = "en";

export type LanguageID = typeof SERBIAN | typeof CROATIAN | typeof ENGLISH;

export type Translations = Map<LanguageID, Translation>;

export function initializeTranslations(): Translations {
  const result = new Map<LanguageID, Translation>();

  result.set(SERBIAN, serbian);
  result.set(CROATIAN, croatian);
  result.set(ENGLISH, english);

  // Post-condition
  if (result.size === 0) {
    throw Error("Expected a non-empty map of translations.");
  }
  return result;
}

/**
 * Infer the translation language from the navigator language.
 *
 * It matches first exactly, then by the primary language. If no match has been found, the first language
 * in the given list is returned.
 *
 * @param navigatorLanguage language as indicated by the browser
 * @param languages list of available translation languages
 */
export function inferDefault(
  navigatorLanguage: bcp47.Tag,
  languages: LanguageID[]
): LanguageID {
  let result: LanguageID | undefined = undefined;

  for (const lang of languages) {
    if (lang === navigatorLanguage) {
      result = lang;
      break;
    }

    if (bcp47.primaryLanguage(navigatorLanguage) === lang) {
      result = lang;
      break;
    }
  }

  if (result === undefined) {
    return languages[0];
  }
  return result;
}

export const Context = React.createContext<Translations | undefined>(undefined);
