import grey from '@material-ui/core/colors/grey';
import yellow from '@material-ui/core/colors/yellow';
import Star from '@material-ui/icons/Star';
import * as React from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import Flash from 'react-reveal/Flash';

import * as app from '../app';
import * as question from '../question';
import * as select from '../select';

function Indicator(props: { hit: boolean; current: boolean; large?: boolean }) {
  const style = {
    color: props.hit ? yellow[700] : grey[100],
    ...(props.current ? { background: '#6495ED', borderRadius: '50%' } : {}),
    ...(props.large ? { fontSize: '3em' } : {}),
  };

  return (
    <Flash when={props.hit} duration={1500} count={2}>
      <span>
        <Star style={style} />
      </span>
    </Flash>
  );
}

function Score(props: { hitsIDs: Array<[boolean, question.ID]>; currentIndex: number; large?: boolean }) {
  return (
    <>
      {props.hitsIDs.map(([hit, id], i) => {
        return <Indicator key={id} hit={hit} current={props.currentIndex === i} large={props.large} />;
      })}
    </>
  );
}

export function ScoreBar(props: { large?: boolean }) {
  const selectContext = useContext(select.Context);
  if (selectContext === undefined) {
    throw Error('Expected selector context to be set.');
  }

  const hitsIDs = useSelector((s: app.State) => selectContext.hitsIDs(s));
  const currentIndex = useSelector((s: app.State) => selectContext.currentIndex(s));

  return <Score hitsIDs={hitsIDs} currentIndex={currentIndex} large={props.large} />;
}
