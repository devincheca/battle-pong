import { ACTIONS } from '../../ACTIONS';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../CONSTANTS';

export function reducer(state, { type, payload }) {
  switch(type) {

    case ACTIONS.SAVE_CANVAS_REF:
      if (payload) {
        state.canvasRef = payload;
      
        state.canvasContext = payload.getContext('2d');

        state.activeBalls[crypto.randomUUID()] = {
          x: getRandomValidX(),
          y: getRandomValidY(),
          dx: 5,
          dy: 5,
        };
      }
      break;

    case ACTIONS.MOVE_BALLS:
      // Compute wall bounces
      state.activeBalls = Object.keys(state.activeBalls)
        .reduce((acc, key) => {
          const activeBall = state.activeBalls[key];
          const { x, y } = activeBall;
          if (x > CANVAS_WIDTH || x < 0) activeBall.dx = activeBall.dx * -1;
          if (y > CANVAS_HEIGHT || y < 0) activeBall.dy = activeBall.dy * -1;
          return {
            ...acc,
            [key]: {
              ...activeBall,
              x: activeBall.x + activeBall.dx,
              y: activeBall.y + activeBall.dy,
            },
          };
        }, {});

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
      const newLeft = state.left - 10;
      state.left = newLeft < 0 ? state.left : newLeft;
      break;

    case ACTIONS.RIGHT_MOVE:
      const newRight = state.left + 10;
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

  left: 152,
};

export const getRandomValidX = () => {
  const x = Math.round(Math.random() * 1000);
  return x < CANVAS_WIDTH ? x : getRandomValidX();
};

export const getRandomValidY = () => {
  const y = Math.round(Math.random() * 1000);
  return y < CANVAS_HEIGHT ? y : getRandomValidY();
}
