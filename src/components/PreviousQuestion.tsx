import { IconButton } from '@material-ui/core';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import * as effect from '../effect';

export function PreviousQuestion() {
  const dispatch = useDispatch();
  return (
    <IconButton
      style={{ padding: 0, margin: 0 }}
      onClick={() => {
        dispatch(effect.previousQuestion());
      }}
      data-testid="previousQuestion"
    >
      <ArrowLeft style={{ fontSize: '2.7em' }} />
    </IconButton>
  );
}
