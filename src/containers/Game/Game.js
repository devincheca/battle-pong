import React, { createContext, useReducer } from 'react';

// Redux
import { reducer, initialState } from './reducer';

// Containers
import Canvas from '../Canvas';

export const GameContext = createContext(null);

export default function Game() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ textAlign: 'center' }}>
      <GameContext.Provider value={{ state, dispatch }}>
        <Canvas />
      </GameContext.Provider>
    </div>
  );
}
