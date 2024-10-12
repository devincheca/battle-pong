import { CANVAS_HEIGHT, CANVAS_ID, CANVAS_WIDTH, RENDER_INTERVAL, WINDOW_STATE } from "../CONSTANTS";

export const canvasRenderer = () => {
  setTimeout(() => canvasRenderer(), RENDER_INTERVAL);

  const state = JSON.parse(window.localStorage.getItem(WINDOW_STATE));

  if (state && state.activeBalls) {
    const { activeBalls } = state;
    const illustrator = new BallIllustrator();

    const canvasContext = document.getElementById(CANVAS_ID).getContext('2d');
    illustrator.ctx = canvasContext;
    illustrator.activeBalls = activeBalls;

    illustrator.drawBalls();
  }
};

export class BallIllustrator {
  drawBalls() {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    Object.keys(this.activeBalls)
      .map(key => {
        const { x, y } = this.activeBalls[key];
        this.ctx.beginPath();
        this.ctx.arc(x, y, 10, 0, 2 * Math.PI);
        this.ctx.stroke();
      });
  }
}
