import { TextField } from "@material-ui/core";
import * as React from "react";
import { Ref, useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../action";
import * as effect from "../effect";
import * as reducer from "../reducer";

export function Answer() {
  const answer = useSelector(
    (state: reducer.State) => state.answers.get(state.currentQuestion) || ""
  );

  const dispatch = useDispatch();

  const inputEl: Ref<HTMLInputElement> = useRef(null);
  const focusPending = useSelector(
    (state: reducer.State) => state.focusPending
  );

  useEffect(() => {
    if (focusPending) {
      inputEl.current?.focus();
      dispatch(action.ackRefocus());
    }
  });

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
      inputRef={inputEl}
      onChange={(e) => {
        dispatch(action.changeAnswer(e.target.value));
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          dispatch(effect.speak());
        }
      }}
      value={answer}
    />
  );
}
