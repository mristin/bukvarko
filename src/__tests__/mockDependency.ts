import * as dependency from "../dependency";
import * as i18n from "../i18n";
import * as question from "../question";

const mockSpeechSynthesis = ({
  cancel: () => {},
  speak: (_: SpeechSynthesisUtterance) => {},
  getVoices: (): SpeechSynthesisVoice[] =>
    ([
      { lang: "en-GB", name: "Anna" },
      { lang: "en-US", name: "Barbara" },
      { lang: "sr", name: "Lejla" },
    ] as unknown) as SpeechSynthesisVoice[],
} as unknown) as SpeechSynthesis;

export const registry: dependency.Registry = dependency.initializeRegistry(
  question.initializeBank(),
  mockSpeechSynthesis as SpeechSynthesis,
  i18n.initializeTranslations()
);
