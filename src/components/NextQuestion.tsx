import { IconButton } from "@material-ui/core";
import ArrowRight from "@material-ui/icons/ArrowRight";
import * as React from "react";
import { useDispatch } from "react-redux";

import { gotoNextQuestion } from "../actions";

export function NextQuestion(props: { refocus: () => void }) {
  const dispatch = useDispatch();

  return (
    <IconButton
      onClick={() => {
        dispatch(gotoNextQuestion());
        props.refocus();
      }}
      data-testid="nextQuestion"
    >
      <ArrowRight fontSize="large" />
    </IconButton>
  );
}
