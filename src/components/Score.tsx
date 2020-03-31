import grey from "@material-ui/core/colors/grey";
import yellow from "@material-ui/core/colors/yellow";
import Star from "@material-ui/icons/Star";
import * as React from "react";
import { ConnectedProps, connect } from "react-redux";

import { QuestionID, compareAnswers, questionBank } from "../QuestionBank";
import { State } from "../reducers";

const mapStateToProps = (state: State) => {
  const hitsIDs = new Array<[boolean, QuestionID]>(
    questionBank.questions.length
  );

  for (const [i, question] of questionBank.questions.entries()) {
    const answer = state.answers.get(question.id) || "";

    const hit = compareAnswers(question.expectedAnswer, answer);

    hitsIDs[i] = [hit, question.id];
  }

  const currentIndex = questionBank.index(state.currentQuestion);

  return { hitsIDs, currentIndex };
};

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

const component = (props: Props) => {
  return (
    <>
      {props.hitsIDs.map(([hit, id], i) => {
        const style = {
          color: hit ? yellow[700] : grey[500],
          ...(i === props.currentIndex ? { background: "azure" } : {}),
        };

        return <Star key={id} style={style} />;
      })}
    </>
  );
};

export const Score = connector(component);
