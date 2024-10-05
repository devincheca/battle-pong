// Redux
import { ACTIONS } from '../../ACTIONS';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CENTER_LEFT_PX,
  MOVEMENT_INTERVAL,
} from '../../CONSTANTS';

// Helpers
import { createNewActiveBall, removeOutOfBoundsBalls } from './ball-helpers';
import { computeActiveBalls } from './ball-movement';

export function reducer(state, { type, payload }) {
  switch(type) {

    case ACTIONS.SAVE_CANVAS_REF:
      if (payload) {
        state.canvasRef = payload;
      
        state.canvasContext = payload.getContext('2d');

        const newBall = createNewActiveBall();
        state.activeBalls[newBall.id] = { ...newBall };
      }
      break;

    case ACTIONS.MOVE_BALLS:
      // Compute wall bounces & blocks 
      state.activeBalls = computeActiveBalls(state);
      
      state.activeBalls = removeOutOfBoundsBalls(state.activeBalls);

      // Computer ball bounces
      state.activeX = Object.keys(state.activeBalls)
        .reduce((acc, key) => ({ ...acc, [state.activeBalls[key].x]: key }), {});
      state.activeY = Object.keys(state.activeBalls)
        .reduce((acc, key) => ({ ...acc, [state.activeBalls[key].y]: key }), {});
      state.activeBalls = Object.keys(state.activeBalls)
        .reduce((acc, key) => {
          const activeBall = state.activeBalls[key];
          const { x, y } = activeBall;

          let { dx, dy } = activeBall;

          if (state.activeX[x] && state.activeX[x] !== key) dx = dx * -1;
          if (state.activeY[y] && state.activeY[y] !== key) dy = dy * -1;

          return {
            ...acc,
            [key]: {
              ...activeBall,
              dx,
              dy,
            },
          };
        }, {});
      break;

    case ACTIONS.LEFT_MOVE:
      const newLeft = state.left - MOVEMENT_INTERVAL;
      state.left = newLeft < 0 ? state.left : newLeft;
      break;

    case ACTIONS.RIGHT_MOVE:
      const newRight = state.left + MOVEMENT_INTERVAL;
      state.left = newRight > 302 ? state.left : newRight;
      break;
    
    default:
      break;
  }

  return { ...state };
}

export const initialState = {
  canvasRef: null,
  canvasContext: null,

  activeBalls: {},
  activeX: {},
  activeY: {},

  left: CENTER_LEFT_PX,
};
