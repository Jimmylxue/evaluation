import { systemInfo } from "@/subpackages/games/common/utils";
import { CanvasContext } from "@tarojs/taro";

export class Blood {
  bloodBoxWidth = systemInfo.screenWidth - 80;
  bloodBoxHeight = 20;
  bloodBoxX = systemInfo.screenWidth / 2 - this.bloodBoxWidth / 2;

  maxBloodWidth = this.bloodBoxWidth - 10;

  bloodWidth = this.bloodBoxWidth - 10;
  constructor(private ctx: CanvasContext) {}

  get isTimeOut() {
    return this.bloodWidth <= 0 ? true : false;
  }

  paint() {
    this.ctx.fillStyle = "#d55172";
    this.ctx.fillRect(
      this.bloodBoxX,
      10,
      this.bloodBoxWidth,
      this.bloodBoxHeight
    );

    if (!this.isTimeOut) {
      this.bloodWidth -= 0.5;
    } else {
      this.bloodWidth = 0;
    }

    this.ctx.fillStyle = "#f9de79";
    this.ctx.fillRect(
      this.bloodBoxX + 2,
      13,
      this.bloodWidth,
      this.bloodBoxHeight - 6
    );
  }
}
