import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import * as React from "react";
import { useDispatch } from "react-redux";

import * as action from "../action";

export function PreferencesButton() {
  const dispatch = useDispatch();

  return (
    <Button>
      <SettingsIcon onClick={() => dispatch(action.togglePreferences(true))} />
    </Button>
  );
}
