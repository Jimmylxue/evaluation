import { CanvasContext } from "@tarojs/taro";

export class Score {
  /**
   * 得分
   */
  public score: number = 0;

  constructor(private ctx: CanvasContext) {}

  addScore() {
    this.score += 1;
  }

  paint() {
    // @ts-ignore
    this.ctx.textAlign = "center"; // 设置文字的基线居中
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "#dbb640";
    this.ctx.fillText(this.score + "", 20, 30);
  }
}
