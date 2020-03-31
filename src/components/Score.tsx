import grey from "@material-ui/core/colors/grey";
import yellow from "@material-ui/core/colors/yellow";
import Star from "@material-ui/icons/Star";
import * as React from "react";
import { useSelector } from "react-redux";

import { QuestionID, compareAnswers, questionBank } from "../QuestionBank";
import { State } from "../reducers";

export function Score() {
  const hitsIDs = useSelector((state: State) => {
    const result = new Array<[boolean, QuestionID]>(
      questionBank.questions.length
    );

    for (const [i, question] of questionBank.questions.entries()) {
      const answer = state.answers.get(question.id) || "";

      const hit = compareAnswers(question.expectedAnswer, answer);

      result[i] = [hit, question.id];
    }

    return result;
  });

  const currentIndex = useSelector((state: State) =>
    questionBank.index(state.currentQuestion)
  );

  return (
    <>
      {hitsIDs.map(([hit, id], i) => {
        const style = {
          color: hit ? yellow[700] : grey[500],
          ...(i === currentIndex ? { background: "azure" } : {}),
        };

        return <Star key={id} style={style} />;
      })}
    </>
  );
}
