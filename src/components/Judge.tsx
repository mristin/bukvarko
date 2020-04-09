import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import * as React from "react";
import { useSelector } from "react-redux";

import * as question from "../question";
import * as reducer from "../reducer";

export function Judge() {
  const hit = useSelector((state: reducer.State) => {
    const q = question.bank.get(state.currentQuestion);
    const answer = state.answers.get(state.currentQuestion) || "";

    return question.compareAnswers(q.expectedAnswer, answer);
  });

  return hit ? (
    <ThumbUp style={{ color: "green" }} />
  ) : (
    <ThumbDown style={{ color: "red" }} />
  );
}
