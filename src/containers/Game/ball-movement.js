// Constants
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../CONSTANTS";

export const computeActiveBalls = ({ activeBalls, left }) => Object.keys(activeBalls)
  .reduce((acc, key) => {
    const activeBall = activeBalls[key];
    const { x, y } = activeBall;

    let toRemove = false;

    if (x > CANVAS_WIDTH || x < 0) activeBall.dx = activeBall.dx * -1;
    if (y < 0) activeBall.dy = activeBall.dy * -1;
    if (y > CANVAS_HEIGHT) {
      const bumperPoint = left + 30;
      const bumperWindow = 15;

      if (x >= bumperPoint - bumperWindow && x <= bumperPoint + bumperWindow) { 
        activeBall.dx = activeBall.dx * -1;
        activeBall.dy = activeBall.dy * -1;
      } else {
        toRemove = true;
      }
    }

    return {
      ...acc,
      [key]: {
        ...activeBall,
        x: activeBall.x + activeBall.dx,
        y: activeBall.y + activeBall.dy,
        toRemove,
      },
    };
  }, {});
