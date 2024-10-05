import React, { createContext, useReducer } from 'react';

// Redux
import { reducer, initialState } from './reducer';

// Containers
import Canvas from '../Canvas';
import DPad from '../DPad';
import ActionButtons from '../ActionButtons';

export const GameContext = createContext(null);

export default function Game() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
