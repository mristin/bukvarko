import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import * as React from "react";
import { useSelector } from "react-redux";

import { compareAnswers, questionBank } from "../QuestionBank";
import { State } from "../reducers";

export function Judge() {
  const hit = useSelector((state: State) => {
    const question = questionBank.get(state.currentQuestion);
    const answer = state.answers.get(state.currentQuestion) || "";

    return compareAnswers(question.expectedAnswer, answer);
  });

  return hit ? (
    <ThumbUp style={{ color: "green" }} />
  ) : (
    <ThumbDown style={{ color: "red" }} />
  );
}
