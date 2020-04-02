import { TextField } from "@material-ui/core";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeAnswer } from "../actions";
import { State } from "../reducers";

export function Answer() {
  const answer = useSelector(
    (state: State) => state.answers.get(state.currentQuestion) || ""
  );

  const dispatch = useDispatch();

  return (
    <TextField
      variant="outlined"
      inputProps={{
        maxLength: 15,
        size: 15,
        style: {
          fontSize: 40,
          fontFamily: "Lucida console, Monaco, monospace",
          letterSpacing: "0.2em",
        },
        "data-testid": "answer",
      }}
      onChange={(e) => {
        dispatch(changeAnswer(e.target.value));
      }}
      value={answer}
    />
  );
}
