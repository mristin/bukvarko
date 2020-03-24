import { IconButton } from "@material-ui/core";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import * as React from "react";
import { ConnectedProps, connect } from "react-redux";

import { gotoPreviousQuestion } from "../actions";

const mapDispatchToProps = {
  gotoPreviousQuestion,
};

const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const component = (props: Props) => (
  <IconButton onClick={props.gotoPreviousQuestion}>
    <ArrowLeft fontSize="large" />
  </IconButton>
);

export const PreviousQuestion = connector(component);
