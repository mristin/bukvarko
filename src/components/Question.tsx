import * as React from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';

import * as app from '../app';
import * as select from '../select';

export function Question(props: { maxImageHeight: number }) {
  const selectContext = useContext(select.Context);
  if (selectContext === undefined) {
    throw Error('Expected selector context to be set.');
  }

  const imageURL = useSelector((s: app.State) => selectContext.currentQuestionImageURL(s));
  const currentQuestion = useSelector((s: app.State) => s.currentQuestion);

  return (
    <Fade top appear duration={600} spy={currentQuestion}>
      <div style={{ height: props.maxImageHeight, width: '95%' }}>
        <img
          src={imageURL}
          alt="question image"
          style={{ maxWidth: '95%', maxHeight: '95%', width: 'auto', height: 'auto', border: '1px solid black' }}
        />
      </div>
    </Fade>
  );
}
