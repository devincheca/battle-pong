import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../CONSTANTS";

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
