export class Score {
  /**
   * 得分
   */
  public score: number = 0;

  constructor(private ctx: Taro.CanvasContext) {}

  addScore() {
    this.score += 1;
  }

  painScore() {
    this.ctx.setTextAlign("center"); // 设置文字的基线居中
    this.ctx.setFontSize(25);
    this.ctx.setFillStyle("#dbb640");
    this.ctx.fillText(this.score + "", 20, 30);
  }
}
