import * as React from "react";
import {connect, ConnectedProps} from 'react-redux';
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import {IconButton} from "@material-ui/core";

import {State} from "../reducers";

const mapStateToProps = (state: State) => {
    const answer = state.answers.get(state.currentQuestion);

    const text = (answer) ? `Ovde piše: ${answer}` : 'Ovde ništa ne piše.';

    return {text};
};

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

function speak(text: string) {
    const u = new SpeechSynthesisUtterance();
    u.text = text;
    u.lang = "sr-RS";
    u.volume = 1; // 0 to 1
    u.rate = 0.7; // 0.1 to 1
    u.pitch = 2; //0 to 2

    speechSynthesis.speak(u);
}

const component = (props: Props) => (
    <IconButton style={{marginLeft: "1em"}} onClick={() => speak(props.text)}>
        <RecordVoiceOver/>
    </IconButton>
);

export const Speaker = connector(component);
