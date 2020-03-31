import * as React from "react";
import { useSelector } from "react-redux";

import { questionBank } from "../QuestionBank";
import { State } from "../reducers";

export function Question() {
  const question = useSelector((state: State) =>
    questionBank.get(state.currentQuestion)
  );

  return (
    <img
      src={question.imageURL}
      alt={question.id}
      style={{ width: "90%", border: "1px solid black" }}
    />
  );
}
