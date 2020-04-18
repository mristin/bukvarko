import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import * as React from 'react';

export function Unfortunately(props: { error: string }) {
  return (
    <Container>
      <Paper elevation={3} style={{ marginTop: '2em', padding: '2em' }}>
        <div style={{ textAlign: 'center' }}>
          <SentimentVeryDissatisfiedIcon />
        </div>
        <div style={{ marginTop: '2em' }}>{props.error}</div>
      </Paper>
    </Container>
  );
}
