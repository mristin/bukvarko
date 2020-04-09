import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import * as React from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";

import * as reducer from "../reducer";
import * as select from "../select";

export function Judge() {
  const selectContext = useContext(select.Context);
  if (selectContext === undefined) {
    throw Error("Expected selector context to be set.");
  }

  const hit = useSelector((s: reducer.State) =>
    selectContext.currentAnswerHits(s)
  );

  return hit ? (
    <ThumbUp style={{ color: "green" }} />
  ) : (
    <ThumbDown style={{ color: "red" }} />
  );
}
