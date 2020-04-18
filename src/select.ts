import deepEqual from 'deep-equal';
import * as React from 'react';

import * as app from './app';
import * as dependency from './dependency';
import * as i18n from './i18n';
import * as question from './question';
import * as speech from './speech';

export class WithDeps {
  constructor(private deps: dependency.Registry) {}

  public currentQuestionImageURL(state: app.State): string {
    return this.deps.questionBank.get(state.currentQuestion).imageURL;
  }

  public resolveTranslation(state: app.State): i18n.Translation {
    const translation = this.deps.translations.get(state.language);
    if (translation === undefined) {
      throw Error(`The translation in the state could not be found in the translations: ${state.language}`);
    }
    return translation;
  }

  public currentAnswerHits(state: app.State): boolean {
    const answer = state.answers.get(state.currentQuestion) || '';

    const answerChecker = this.resolveTranslation(state).answerCheckers[state.currentQuestion];

    return answerChecker(answer);
  }

  public hitsIDs(state: app.State): Array<[boolean, question.ID]> {
    const result = new Array<[boolean, question.ID]>(this.deps.questionBank.questions.length);

    for (const [i, q] of this.deps.questionBank.questions.entries()) {
      const answer = state.answers.get(q.id) || '';

      const answerChecker = this.resolveTranslation(state).answerCheckers[q.id];

      const hit = answerChecker(answer);

      result[i] = [hit, q.id];
    }

    // Post-conditions
    {
      const gotIDs = result.map(([_, id]) => id);
      const expectedIDs = this.deps.questionBank.questions.map((q) => q.id);

      if (!deepEqual(gotIDs, expectedIDs)) {
        throw Error(`Expected IDs ${JSON.stringify(expectedIDs)} to match: ${JSON.stringify(gotIDs)}`);
      }
    }
    return result;
  }

  public currentIndex(state: app.State): number {
    return this.deps.questionBank.index(state.currentQuestion);
  }

  public availableVoices(state: app.State): Array<speech.VoiceID> {
    const r = this.deps.voicesByLanguage.get(state.language);
    if (r === undefined) {
      throw Error(`Current language does not match any in voices grouped by translation: ${state.language}`);
    }

    return r;
  }
}

export const Context = React.createContext<WithDeps | undefined>(undefined);
