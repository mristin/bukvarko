import deepEqual from "deep-equal";
import * as React from "react";

import * as dependency from "./dependency";
import * as question from "./question";
import * as reducer from "./reducer";

export class WithDeps {
  constructor(private deps: dependency.Registry) {}

  public currentQuestionImageURL(state: reducer.State): string {
    return this.deps.questionBank.get(state.currentQuestion).imageURL;
  }

  public currentAnswerHits(state: reducer.State): boolean {
    const q = this.deps.questionBank.get(state.currentQuestion);
    const answer = state.answers.get(state.currentQuestion) || "";

    return question.compareAnswers(q.expectedAnswer, answer);
  }

  public hitsIDs(state: reducer.State): Array<[boolean, question.ID]> {
    const result = new Array<[boolean, question.ID]>(
      this.deps.questionBank.questions.length
    );

    for (const [i, q] of this.deps.questionBank.questions.entries()) {
      const answer = state.answers.get(q.id) || "";

      const hit = question.compareAnswers(q.expectedAnswer, answer);

      result[i] = [hit, q.id];
    }

    // Post-conditions
    {
      const gotIDs = result.map(([_, id]) => id);
      const expectedIDs = this.deps.questionBank.questions.map((q) => q.id);

      if (!deepEqual(gotIDs, expectedIDs)) {
        throw Error(
          `Expected IDs ${JSON.stringify(
            expectedIDs
          )} to match: ${JSON.stringify(gotIDs)}`
        );
      }
    }
    return result;
  }

  public currentIndex(state: reducer.State): number {
    return this.deps.questionBank.index(state.currentQuestion);
  }
}

export const Context = React.createContext<WithDeps | undefined>(undefined);
