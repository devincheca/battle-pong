import React, { useContext } from 'react';
import { GameContext } from './Game/Game';
import { ACTIONS } from '../ACTIONS';

export default function DPad() {
  const { dispatch } = useContext(GameContext);

  const buttonStyle = {
    padding: '2em',
  };

  return (
    <div>
      <button
        style={{ ...buttonStyle }}
        onClick={() => dispatch({ type: ACTIONS.LEFT_MOVE })}>
        {`<`}
      </button>
      <button
        style={{ ...buttonStyle }}
        onClick={() => dispatch({ type: ACTIONS.RIGHT_MOVE })}>
        {`>`}
      </button>
    </div>
  );
}
