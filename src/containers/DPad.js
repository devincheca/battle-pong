import React, { useContext } from 'react';
import { GameContext } from './Game/Game';
import { ACTIONS } from '../ACTIONS';

export default function DPad() {
  const { dispatch } = useContext(GameContext);

  return (
    <div>
      <button onClick={() => dispatch({ type: ACTIONS.LEFT_MOVE })}>{`<`}</button>
      <button onClick={() => dispatch({ type: ACTIONS.RIGHT_MOVE })}>{`>`}</button>
    </div>
  );
}
