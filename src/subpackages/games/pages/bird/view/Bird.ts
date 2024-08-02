import { CanvasContext } from "@tarojs/taro";
import { systemInfo } from "../utils";
import { tempImgFile } from "../const";

export class Bird {
  width = 40;
  height = 40;
  x = 0;
  y = 210;

  status: "up" | "down" = "down";

  /**
   * 居中的位置
   */
  centerX = 0;

  img_source: string[] = [];

  /**
   * 是否碰撞或者掉落 -> 游戏结束
   */
  isCollision: boolean = false;

  constructor(private ctx: CanvasContext) {
    this.x = systemInfo.screenWidth / 2 - this.width - 50;
    this.img_source = [tempImgFile.bird1, tempImgFile.bird2, tempImgFile.bird3];
  }

  /**
   * 更新小鸟的状态
   */
  updateStatus(status: "up" | "down") {
    this.status = status;
  }

  paint() {
    if (this.status === "up") {
      if (this.y >= 0) {
        this.y -= 3;
      }
    } else {
      if (this.y <= systemInfo.screenHeight + this.height) {
        this.y += 4;
      } else {
        this.isCollision = true;
      }
    }
    this.ctx.drawImage(
      this.img_source[this.status === "up" ? 0 : 1],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
