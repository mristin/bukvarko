import * as dependency from "../dependency";
import * as i18n from "../i18n";
import * as question from "../question";

const mockSpeechSynthesis = {
  cancel: () => {},
  speak: (_: SpeechSynthesisUtterance) => {},
  getVoices: (): SpeechSynthesisVoice[] =>
    ([
      { lang: "en-GB", name: "Anna" },
      { lang: "en-US", name: "Barbara" },
      { lang: "sr", name: "Lejla" },
    ] as unknown) as SpeechSynthesisVoice[],
};

export class MockStorage {
  private map = new Map<string, string>();

  public setItem(key: string, value: string) {
    this.map.set(key, value);
  }

  public getItem(key: string): string | undefined {
    return this.map.get(key);
  }

  public removeItem(key: string) {
    this.map.delete(key);
  }

  public clear() {
    this.map.clear();
  }
}

export function initializeRegistry(): dependency.Registry {
  return dependency.initializeRegistry(
    question.initializeBank(),
    (mockSpeechSynthesis as unknown) as SpeechSynthesis,
    i18n.initializeTranslations(),
    (new MockStorage() as unknown) as Storage
  );
}
