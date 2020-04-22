import { IconButton } from '@material-ui/core';
import RecordVoiceOver from '@material-ui/icons/RecordVoiceOver';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import * as action from '../action';
import * as effect from '../effect';

export function Speaker(props: { style?: any; large?: boolean }) {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(effect.speak());
    dispatch(action.askToRefocus());
  };

  return (
    <IconButton style={props.style} onClick={onClick} data-testid="speak">
      <RecordVoiceOver style={props.large ? { fontSize: '3em' } : {}} />
    </IconButton>
  );
}
