import React, { useContext, useEffect, useRef } from 'react';

// Constants
import { CANVAS_HEIGHT, CANVAS_ID, CANVAS_WIDTH, RENDER_INTERVAL } from '../CONSTANTS';
import { GameContext } from './Game/Game';
import { ACTIONS } from '../ACTIONS';

// Services
import { canvasRenderer } from '../services/ballHandler';

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
    canvasRenderer();

    const intervalId = setInterval(() => {
      dispatch({ type: ACTIONS.MOVE_BALLS });
    }, RENDER_INTERVAL);
  
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const borderStyles = '.1em solid black';
  const border = {
    borderTop: borderStyles,
    borderLeft: borderStyles,
    borderRight: borderStyles,
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
          padding: '10px',
          color: 'red',
        }}>VVVVV</span>
      </div>
    </div>
  )
}
