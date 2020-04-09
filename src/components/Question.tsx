import * as React from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";

import * as reducer from "../reducer";
import * as select from "../select";

export function Question() {
  const selectContext = useContext(select.Context);
  if (selectContext === undefined) {
    throw Error("Expected selector context to be set.");
  }

  const imageURL = useSelector((s: reducer.State) =>
    selectContext.currentQuestionImageURL(s)
  );

  return (
    <img
      src={imageURL}
      alt="question image"
      style={{ width: "90%", border: "1px solid black" }}
    />
  );
}
