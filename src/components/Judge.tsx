import * as React from "react";
import {connect, ConnectedProps} from 'react-redux';
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";

import {State} from "../reducers";
import {questionBank, compareAnswers} from "../QuestionBank";

const mapStateToProps = (state: State) => {
    const question = questionBank.get(state.currentQuestion);
    const answer = state.answers.get(state.currentQuestion) || "";

    const hit = compareAnswers(question.expectedAnswer, answer);

    return {hit};
};

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

const component = (props: Props) => (
    (props.hit) ? <ThumbUp style={{color: "green"}}/> : <ThumbDown style={{color: "red"}}/>
);

export const Judge = connector(component);
