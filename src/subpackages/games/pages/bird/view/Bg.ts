import { CanvasContext } from "@tarojs/taro";
import { systemInfo } from "../../../common/utils";
import { tempImgFile } from "../const";

export class Bg {
  width = systemInfo.screenWidth;
  height = systemInfo.screenHeight;

  /**
   * 背景1
   */
  x1: number = 0;

  /**
   * 背景2
   */
  x2: number = this.width - 2;

  img_source: any[] = [];

  constructor(private ctx: CanvasContext) {
    this.img_source = [tempImgFile.bg];
  }

  paint() {
    this.x1--;
    this.x2--;

    if (this.x1 === -this.width) {
      this.x1 = 0;
      this.x2 = this.width - 2;
    }

    this.ctx.drawImage(this.img_source[0], this.x1, 0, this.width, this.height);
    this.ctx.drawImage(this.img_source[0], this.x2, 0, this.width, this.height);
  }
}
