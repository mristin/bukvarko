import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import * as React from "react";
import { useDispatch } from "react-redux";

import * as action from "../action";

export function DeleteAll() {
  const dispatch = useDispatch();

  return (
    <IconButton
      style={{ marginLeft: "1em" }}
      onClick={() => dispatch(action.deleteAll())}
      data-testid="deleteAll"
    >
      <DeleteIcon />
    </IconButton>
  );
}
