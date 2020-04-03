import { IconButton } from "@material-ui/core";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import * as React from "react";
import { useDispatch } from "react-redux";

import { gotoPreviousQuestion } from "../actions";

export function PreviousQuestion(props: { refocus: () => void }) {
  const dispatch = useDispatch();
  return (
    <IconButton
      onClick={() => {
        dispatch(gotoPreviousQuestion());
        props.refocus();
      }}
      data-testid="previousQuestion"
    >
      <ArrowLeft fontSize="large" />
    </IconButton>
  );
}
