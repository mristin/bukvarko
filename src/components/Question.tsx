import * as React from "react";
import {connect, ConnectedProps} from 'react-redux';
import {State} from "../reducers";
import {questionBank} from "../QuestionBank";

const mapStateToProps = (state: State) => {
    const question = questionBank.get(state.currentQuestion);

    return {url: question.imageURL, alt: question.id};
};

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

const component = (props: Props) => (
    <img src={props.url} alt={props.alt} style={{width: "90%", border: "1px solid black"}}/>
);

export const Question = connector(component);
