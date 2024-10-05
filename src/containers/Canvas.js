import React, { useContext, useEffect, useRef } from 'react';

// Constants
import { CANVAS_HEIGHT, CANVAS_ID, CANVAS_WIDTH } from '../CONSTANTS';
import { GameContext } from './Game/Game';
import { ACTIONS } from '../ACTIONS';

// Services
import { BallIllustrator } from '../services/ballHandler';

export default function Canvas() {
  const canvasRef = useRef(null);

  const { state, dispatch } = useContext(GameContext);

  const { left } = state;

  useEffect(() => {
    dispatch({
      type: ACTIONS.SAVE_CANVAS_REF,
      payload: canvasRef.current,
    });
  }, [canvasRef.current]);

  useEffect(() => {
    if (Object.keys(state.activeBalls).length) {
      const illustrator = new BallIllustrator();
      illustrator.ctx = state.canvasContext;
      illustrator.activeBalls = state.activeBalls;
      illustrator.drawBalls();
      setTimeout(() => dispatch({ type: ACTIONS.MOVE_BALLS }), 10);
    }
  }, [Object.keys(state.activeBalls)])

  const border = {
    borderTop: '.1em solid black',
    borderLeft: '.1em solid black',
    borderRight: '.1em solid black',
  };

  return (
    <div>
      <canvas style={{ ...border }} ref={canvasRef} id={CANVAS_ID} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
      <div>
        <span style={{
          position: 'relative',
          left: `${left}px`,
          backgroundColor: 'red',
          borderTopLeftRadius: '5em',
          borderTopRightRadius: '5em',
          padding: '.5em',
          color: 'red',
        }}>VVV</span>
      </div>
    </div>
  )
}
