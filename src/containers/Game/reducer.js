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
          dx: 2,
          dy: 2,
        };
      }

    case ACTIONS.MOVE_BALLS:
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
    
    default:
      break;
  }

  return { ...state };
}

export const initialState = {
  canvasRef: null,
  canvasContext: null,

  activeBalls: {},
};

export const getRandomValidX = () => {
  const x = Math.round(Math.random() * 1000);
  return x < CANVAS_WIDTH ? x : getRandomValidX();
};

export const getRandomValidY = () => {
  const y = Math.round(Math.random() * 1000);
  return y < CANVAS_HEIGHT ? y : getRandomValidY();
}
