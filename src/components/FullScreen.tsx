import { IconButton } from "@material-ui/core";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import fscreen from "fscreen";
import * as React from "react";
import { useState } from "react";

export function FullScreen() {
  if (!fscreen.fullscreenEnabled) {
    return null;
  }

  const [isFullscreen, setIsFullscreen] = useState(
    fscreen.fullscreenElement !== null
  );

  function toggleFullscreen() {
    if (fscreen.fullscreenElement !== null) {
      fscreen.exitFullscreen();
    } else {
      fscreen.requestFullscreen(document.documentElement);
    }
  }

  fscreen.onfullscreenchange = () => {
    setIsFullscreen(fscreen.fullscreenElement !== null);
  };

  const icon = !isFullscreen ? <FullscreenIcon /> : <FullscreenExitIcon />;
  return (
    <IconButton onClick={toggleFullscreen} style={{ marginLeft: "1em" }}>
      {icon}
    </IconButton>
  );
}
