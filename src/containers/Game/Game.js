import React, { createContext, useEffect, useReducer } from 'react';

// Redux
import { reducer, initialState } from './reducer';
import { ACTIONS } from '../../ACTIONS';

// Containers
import Canvas from '../Canvas';
import DPad from '../DPad';
import ActionButtons from '../ActionButtons';

// Constants
import { ARROW_LEFT_KEY, ARROW_RIGHT_KEY } from '../../CONSTANTS';

export const GameContext = createContext(null);

export default function Game() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    window.onkeydown = ({ key }) => {
      if (key === ARROW_LEFT_KEY) dispatch({ type: ACTIONS.LEFT_MOVE });
      if (key === ARROW_RIGHT_KEY) dispatch({ type: ACTIONS.RIGHT_MOVE });
    };

    return () => window.onkeydown = null;
  }, []);

  return (
    <div style={{ display: 'flex',  justifyContent: 'space-evenly', alignItems: 'center' }}>
      <GameContext.Provider value={{ state, dispatch }}>
        <DPad />
        <Canvas />
        <ActionButtons />
      </GameContext.Provider>
    </div>
  );
}
