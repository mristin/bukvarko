import * as React from "react";
import {connect, ConnectedProps} from 'react-redux';
import {gotoNextQuestion} from "../actions";
import {IconButton} from "@material-ui/core";
import ArrowRight from "@material-ui/icons/ArrowRight";


const mapDispatchToProps = {
    gotoNextQuestion
};

const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const component = (props: Props) => (
    <IconButton onClick={props.gotoNextQuestion}>
        <ArrowRight fontSize='large'/>
    </IconButton>
);

export const NextQuestion = connector(component);
