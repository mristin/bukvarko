import { IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import * as action from '../action';

export function PreferencesButton() {
  const dispatch = useDispatch();

  return (
    <IconButton onClick={() => dispatch(action.togglePreferences(true))}>
      <SettingsIcon />
    </IconButton>
  );
}
