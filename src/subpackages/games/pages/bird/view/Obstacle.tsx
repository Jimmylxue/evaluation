import { CanvasContext } from "@tarojs/taro";
import { systemInfo } from "../utils";
import { tempImgFile } from "../const";
import { obstacleMoveSpeed } from "../core/core";

export class Obstacle {
  width = 40;

  y: number = 0;

  img_source: string[] = [];

  constructor(
    private ctx: CanvasContext,
    private type: "up" | "down",
    public height: number,
    public x: number
  ) {
    if (this.type === "up") {
      this.img_source = [tempImgFile.bamboo_up];
      this.y = 0;
    } else {
      this.img_source = [tempImgFile.bamboo_down];
      this.y = systemInfo.screenHeight - this.height;
    }
  }

  /**
   * 更新水管的高度
   */
  updateHeight(type: "up" | "down") {
    this.type = type;
  }

  /**
   * index 渲染具体哪张图片
   */
  paint() {
    this.x -= obstacleMoveSpeed;
    this.ctx.drawImage(
      this.img_source[0],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
