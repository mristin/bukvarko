import grey from "@material-ui/core/colors/grey";
import yellow from "@material-ui/core/colors/yellow";
import Star from "@material-ui/icons/Star";
import * as React from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";

import { QuestionID } from "../QuestionBank";
import * as reducer from "../reducer";
import * as select from "../select";

function Indicator(props: { hit: boolean; current: boolean }) {
  const style = {
    color: props.hit ? yellow[700] : grey[500],
    ...(props.current ? { background: "azure" } : {}),
  };

  return <Star style={style} />;
}

function Score(props: {
  hitsIDs: Array<[boolean, QuestionID]>;
  currentIndex: number;
}) {
  return (
    <>
      {props.hitsIDs.map(([hit, id], i) => {
        return (
          <Indicator key={id} hit={hit} current={props.currentIndex === i} />
        );
      })}
    </>
  );
}

export function ScoreBar() {
  const selectContext = useContext(select.Context);
  if (selectContext === undefined) {
    throw Error("Expected selector context to be set.");
  }

  const hitsIDs = useSelector((s: reducer.State) => selectContext.hitsIDs(s));
  const currentIndex = useSelector((s: reducer.State) =>
    selectContext.currentIndex(s)
  );

  return <Score hitsIDs={hitsIDs} currentIndex={currentIndex} />;
}
