import { IconButton } from "@material-ui/core";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { askToRefocus } from "../actions";
import { State } from "../reducers";

function speak(text: string) {
  const u = new SpeechSynthesisUtterance();
  u.text = text;
  u.lang = "sr-RS";
  u.volume = 1; // 0 to 1
  u.rate = 0.7; // 0.1 to 1
  u.pitch = 2; //0 to 2

  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

export function Speaker() {
  const text = useSelector((state: State) => {
    const answer = state.answers.get(state.currentQuestion);
    return answer ? `Ovde piše: ${answer}` : "Ovde ništa ne piše.";
  });

  const dispatch = useDispatch();

  const onClick = () => {
    speak(text);
    dispatch(askToRefocus());
  };

  return (
    <IconButton style={{ marginLeft: "1em" }} onClick={onClick}>
      <RecordVoiceOver />
    </IconButton>
  );
}
