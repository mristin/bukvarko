import deepEqual from "deep-equal";

import { QuestionID, compareAnswers, questionBank } from "./QuestionBank";
import { State } from "./reducers";

export function selectHitsIDs(state: State): Array<[boolean, QuestionID]> {
  const result = new Array<[boolean, QuestionID]>(
    questionBank.questions.length
  );

  for (const [i, question] of questionBank.questions.entries()) {
    const answer = state.answers.get(question.id) || "";

    const hit = compareAnswers(question.expectedAnswer, answer);

    result[i] = [hit, question.id];
  }

  // Post-conditions
  {
    const gotIDs = result.map(([_, id]) => id);
    const expectedIDs = questionBank.questions.map((q) => q.id);

    if (!deepEqual(gotIDs, expectedIDs)) {
      throw Error(
        `Expected IDs ${JSON.stringify(expectedIDs)} to match: ${JSON.stringify(
          gotIDs
        )}`
      );
    }
  }
  return result;
}

export function selectCurrentIndex(state: State): number {
  return questionBank.index(state.currentQuestion);
}
