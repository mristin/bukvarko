import { TextField } from "@material-ui/core";
import * as React from "react";
import { ConnectedProps, connect } from "react-redux";

import { changeAnswer } from "../actions";
import { State } from "../reducers";

const mapStateToProps = (state: State) => {
  const answer = state.answers.get(state.currentQuestion) || "";
  return { answer };
};

const mapDispatchToProps = {
  changeAnswer,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const component = (props: Props) => (
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
    }}
    onChange={(e) => {
      props.changeAnswer(e.target.value);
    }}
    value={props.answer}
  />
);

export const Answer = connector(component);
