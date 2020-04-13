import { Container, Grid, Paper } from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";

import * as app from "../app";
import { Answer } from "./Answer";
import { DeleteAll } from "./DeleteAll";
import { FullScreen } from "./FullScreen";
import { Judge } from "./Judge";
import { NextQuestion } from "./NextQuestion";
import { Preferences } from "./Preferences";
import { PreferencesButton } from "./PreferencesButton";
import { PreviousQuestion } from "./PreviousQuestion";
import { Question } from "./Question";
import { ScoreBar } from "./ScoreBar";
import { Speaker } from "./Speaker";

export function App() {
  const hasVoice = useSelector((s: app.State) => s.voice !== undefined);

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "1em" }}>
        <Grid container>
          <Grid item xs={1}>
            <PreviousQuestion />
          </Grid>
          <Grid item xs={3}>
            <Question />
          </Grid>

          <Grid item xs={7}>
            <Answer />

            {hasVoice ? <Speaker /> : null}

            <div style={{ marginTop: "1em" }}>
              <Judge />
            </div>

            <div style={{ marginTop: "1em" }}>
              <ScoreBar />
            </div>
          </Grid>

          <Grid item xs={1}>
            <NextQuestion />
          </Grid>
        </Grid>

        <div style={{ marginTop: "10em" }}>
          <PreferencesButton />

          <FullScreen />

          <DeleteAll />
        </div>
      </Paper>
      <div style={{ fontSize: "xx-small", marginTop: "5em" }}>
        Copyright © 2020 Marko Ristin. MIT License. Github repository:{" "}
        <a href="https://github.com/mristin/bukvarko">
          https://github.com/mristin/bukvarko
        </a>
      </div>

      <Preferences />
    </Container>
  );
}
