import { IconButton } from '@material-ui/core';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import * as actions from '../action';
import * as effect from '../effect';

export function PreviousQuestion() {
  const dispatch = useDispatch();
  return (
    <IconButton
      onClick={() => {
        dispatch(effect.previousQuestion());
        dispatch(actions.askToRefocus());
      }}
      data-testid="previousQuestion"
    >
      <ArrowLeft fontSize="large" />
    </IconButton>
  );
}
