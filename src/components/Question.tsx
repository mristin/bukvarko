import * as React from "react";
import { ConnectedProps, connect } from "react-redux";

import { questionBank } from "../QuestionBank";
import { State } from "../reducers";

const mapStateToProps = (state: State) => {
  const question = questionBank.get(state.currentQuestion);

  return { url: question.imageURL, alt: question.id };
};

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

const component = (props: Props) => (
  <img
    src={props.url}
    alt={props.alt}
    style={{ width: "90%", border: "1px solid black" }}
  />
);

export const Question = connector(component);
