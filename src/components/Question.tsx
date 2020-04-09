import * as React from "react";
import { useSelector } from "react-redux";

import * as question from "../question";
import * as reducer from "../reducer";

export function Question() {
  const imageURL = useSelector(
    (state: reducer.State) => question.bank.get(state.currentQuestion).imageURL
  );

  return (
    <img
      src={imageURL}
      alt="question image"
      style={{ width: "90%", border: "1px solid black" }}
    />
  );
}
