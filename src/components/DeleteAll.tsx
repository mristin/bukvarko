import { IconButton } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import * as action from '../action';

export function DeleteAll(props: { style?: any }) {
  const dispatch = useDispatch();

  return (
    <IconButton style={props.style} onClick={() => dispatch(action.deleteAll())} data-testid="deleteAll">
      <ReplayIcon />
    </IconButton>
  );
}
