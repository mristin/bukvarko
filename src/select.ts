import deepEqual from "deep-equal";
import * as React from "react";

import { Dependencies } from "./dependencies";
import { QuestionID, compareAnswers } from "./QuestionBank";
import { State } from "./reducer";

export class WithDeps {
  constructor(private deps: Dependencies) {}

  public hitsIDs(state: State): Array<[boolean, QuestionID]> {
    const result = new Array<[boolean, QuestionID]>(
      this.deps.questionBank.questions.length
    );

    for (const [i, question] of this.deps.questionBank.questions.entries()) {
      const answer = state.answers.get(question.id) || "";

      const hit = compareAnswers(question.expectedAnswer, answer);

      result[i] = [hit, question.id];
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

  public currentIndex(state: State): number {
    return this.deps.questionBank.index(state.currentQuestion);
  }
}

export const Context = React.createContext<WithDeps | undefined>(undefined);
