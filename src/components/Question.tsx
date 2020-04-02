import * as React from "react";
import { useSelector } from "react-redux";

import { questionBank } from "../QuestionBank";
import { State } from "../reducers";

export function Question() {
  const imageURL = useSelector(
    (state: State) => questionBank.get(state.currentQuestion).imageURL
  );

  return (
    <img
      src={imageURL}
      alt="question image"
      style={{ width: "90%", border: "1px solid black" }}
    />
  );
}
