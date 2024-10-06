// Constants
import { CANVAS_HEIGHT, CANVAS_WIDTH, DEFAULT_DX, DEFAULT_DY } from "../../CONSTANTS";

export const getRandomValidX = () => {
  const x = Math.round(Math.random() * 1000);
  return x < CANVAS_WIDTH ? x : getRandomValidX();
};

export const getRandomValidY = () => {
  const y = Math.round(Math.random() * 1000);
  return y < CANVAS_HEIGHT ? y : getRandomValidY();
};

export const createNewActiveBall = () => ({
  id: crypto.randomUUID(),
  x: getRandomValidX(),
  y: getRandomValidY(),
  dx: DEFAULT_DX,
  dy: DEFAULT_DY,
});

export const removeOutOfBoundsBalls = balls => {
  return Object.keys(balls)
    .reduce((acc, key) => {
      const activeBall = balls[key];
      const { toRemove } = activeBall;

      if (toRemove) {
        const newBall = createNewActiveBall();

        return {
          ...acc,
          [newBall.id]: { ...newBall },
        };
      }

      return { ...acc, [key]: { ...activeBall }};
    }, {});
};
