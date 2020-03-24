import { IconButton } from "@material-ui/core";
import ArrowRight from "@material-ui/icons/ArrowRight";
import * as React from "react";
import { ConnectedProps, connect } from "react-redux";

import { gotoNextQuestion } from "../actions";

const mapDispatchToProps = {
  gotoNextQuestion,
};

const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const component = (props: Props) => (
  <IconButton onClick={props.gotoNextQuestion}>
    <ArrowRight fontSize="large" />
  </IconButton>
);

export const NextQuestion = connector(component);
