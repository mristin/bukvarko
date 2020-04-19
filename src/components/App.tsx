import { Container, Grid, Paper } from '@material-ui/core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import * as app from '../app';
import { Answer } from './Answer';
import { DeleteAll } from './DeleteAll';
import { FullScreen } from './FullScreen';
import { NextQuestion } from './NextQuestion';
import { Preferences } from './Preferences';
import { PreferencesButton } from './PreferencesButton';
import { PreviousQuestion } from './PreviousQuestion';
import { Question } from './Question';
import { ScoreBar } from './ScoreBar';
import { Speaker } from './Speaker';

function Mobile(props: { hasVoice: boolean }) {
  return (
    <Container>
      <Grid container>
        <Grid item xs={2}>
          <PreviousQuestion />
        </Grid>

        <Grid item xs={8}>
          <Question maxImageHeight={180} />
        </Grid>

        <Grid item xs={2}>
          <NextQuestion />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Answer />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <ScoreBar />
        </Grid>
      </Grid>

      <div style={{ marginTop: '1em' }}>
        <PreferencesButton />

        <DeleteAll style={{ marginLeft: '2em' }} />

        {props.hasVoice ? <Speaker style={{ float: 'right' }} /> : null}
      </div>
      <div style={{ fontSize: 'xx-small', marginTop: '1em' }}>
        Copyright © 2020 Marko Ristin. MIT License. Github repository:{' '}
        <a href="https://github.com/mristin/bukvarko">https://github.com/mristin/bukvarko</a>
      </div>

      <Preferences />
    </Container>
  );
}

function Desktop(props: { hasVoice: boolean }) {
  return (
    <Container>
      <Paper elevation={3} style={{ marginTop: '2em', padding: '2em' }}>
        <Grid container>
          <Grid item xs={1}>
            <PreviousQuestion />
          </Grid>
          <Grid item xs={3}>
            <Question maxImageHeight={234} />
          </Grid>

          <Grid item xs={7}>
            <Answer />

            {props.hasVoice ? <Speaker style={{ marginLeft: '1em' }} /> : null}

            <div style={{ marginTop: '1em' }}>
              <ScoreBar />
            </div>
          </Grid>

          <Grid item xs={1}>
            <NextQuestion />
          </Grid>
        </Grid>

        <div style={{ marginTop: '10em' }}>
          <PreferencesButton />

          <FullScreen />

          <DeleteAll style={{ float: 'right' }} />
        </div>
      </Paper>
      <div style={{ fontSize: 'xx-small', marginTop: '5em' }}>
        Copyright © 2020 Marko Ristin. MIT License. Github repository:{' '}
        <a href="https://github.com/mristin/bukvarko">https://github.com/mristin/bukvarko</a>
      </div>

      <Preferences />
    </Container>
  );
}

function useWindowSize() {
  // From https://usehooks.com/useWindowSize/
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount.

  return windowSize;
}

export function App() {
  const hasVoice = useSelector((s: app.State) => s.voiceByLanguage.get(s.language) !== undefined);

  const { width } = useWindowSize();

  if (width === undefined || width < 500) {
    return <Mobile hasVoice={hasVoice} />;
  } else {
    return <Desktop hasVoice={hasVoice} />;
  }
}
