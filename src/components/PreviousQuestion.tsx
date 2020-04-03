import { IconButton } from "@material-ui/core";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import * as React from "react";
import { useDispatch } from "react-redux";

import { askToRefocus, gotoPreviousQuestion } from "../actions";

export function PreviousQuestion() {
  const dispatch = useDispatch();
  return (
    <IconButton
      onClick={() => {
        dispatch(gotoPreviousQuestion());
        dispatch(askToRefocus());
      }}
      data-testid="previousQuestion"
    >
      <ArrowLeft fontSize="large" />
    </IconButton>
  );
}
