import { IconButton } from '@material-ui/core';
import ArrowRight from '@material-ui/icons/ArrowRight';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import * as effect from '../effect';

export function NextQuestion() {
  const dispatch = useDispatch();

  return (
    <IconButton
      style={{ padding: 0, margin: 0 }}
      onClick={() => {
        dispatch(effect.nextQuestion());
      }}
      data-testid="nextQuestion"
    >
      <ArrowRight style={{ fontSize: '2.8em' }} />
    </IconButton>
  );
}
