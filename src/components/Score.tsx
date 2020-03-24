import * as React from "react";
import {connect, ConnectedProps} from 'react-redux';
import yellow from "@material-ui/core/colors/yellow";
import grey from "@material-ui/core/colors/grey";
import Star from "@material-ui/icons/Star";

import {State} from "../reducers";
import {compareAnswers, questionBank, QuestionID} from "../QuestionBank";


const mapStateToProps = (state: State) => {
    const hitsIDs = new Array<[boolean, QuestionID]>(questionBank.questions.length);

    let currentIndex = -1;

    for (const [i, question] of questionBank.questions.entries()) {
        const answer = state.answers.get(question.id) || "";

        const hit = compareAnswers(question.expectedAnswer, answer);

        hitsIDs[i] = [hit, question.id];

        if (question.id === state.currentQuestion) {
            currentIndex = i;
        }
    }

    if (currentIndex < 0) {
        throw Error(`Expected current question to match an index in questions: ${state.currentQuestion}`);
    }

    return {hitsIDs, currentIndex};
};

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

const component = (props: Props) => {
    return (
        <React.Fragment>
            {props.hitsIDs.map(([hit, id], i) => {
                const style = {
                    color: (hit) ? yellow[700] : grey[500],
                    ...(i === props.currentIndex) ? {background: "azure"} : {}
                };

                return (
                    <Star key={id} style={style}/>
                );
            })}
        </React.Fragment>);
};

export const Score = connector(component);
