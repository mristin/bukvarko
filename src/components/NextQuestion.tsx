import { IconButton } from "@material-ui/core";
import ArrowRight from "@material-ui/icons/ArrowRight";
import * as React from "react";
import { useDispatch } from "react-redux";

import { askToRefocus } from "../actions";
import { nextQuestion } from "../thunks";

export function NextQuestion() {
  const dispatch = useDispatch();

  return (
    <IconButton
      onClick={() => {
        dispatch(nextQuestion());
        dispatch(askToRefocus());
      }}
      data-testid="nextQuestion"
    >
      <ArrowRight fontSize="large" />
    </IconButton>
  );
}
