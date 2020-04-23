import { createMemoryHistory } from 'history';

import * as audio from '../audio';
import * as dependency from '../dependency';
import * as i18n from '../i18n';
import * as question from '../question';

const mockSpeechSynthesis = {
  cancel: () => {
    /* do nothing */
  },
  speak: (_: SpeechSynthesisUtterance) => {
    /* do nothing */
  },
  getVoices: (): SpeechSynthesisVoice[] =>
    ([
      { lang: 'en-GB', name: 'Anna' },
      { lang: 'en-US', name: 'Barbara' },
      { lang: 'sr', name: 'Lejla' },
    ] as unknown) as SpeechSynthesisVoice[],
};

class MockPlayer {
  private src: string | undefined = undefined;

  public set(src: string) {
    this.src = src;
  }

  public play() {
    if (this.src === undefined) {
      throw Error('From MockPlayer: No audio has been set so far. Did you call set() on the player?');
    }
  }

  public pause() {
    // Do nothing
  }
}

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

  get length(): number {
    return this.map.size;
  }
}

export function initializeRegistry(): dependency.Registry {
  return dependency.initializeRegistry(
    question.initializeBank(),
    (mockSpeechSynthesis as unknown) as SpeechSynthesis,
    i18n.initializeTranslations(),
    (new MockStorage() as unknown) as Storage,
    createMemoryHistory(),
    (new MockPlayer() as unknown) as audio.Player,
  );
}
