import { Canvas, Image } from "@tarojs/taro";
import { systemInfo } from "../../../common/utils";
import { SourceMap } from "../const";

export class TreeBase {
  width = 130;
  height = 100;

  x = systemInfo.screenWidth / 2 - this.width / 2;

  y = systemInfo.screenHeight - this.height - 45;

  _treeBase: Image;

  constructor(private canvas: Canvas, private ctx: any) {
    this._treeBase = this.canvas.createImage();
    this._treeBase.src = SourceMap.treeBase;
  }

  paint() {
    this.ctx.drawImage(this._treeBase, this.x, this.y, this.width, this.height);
  }
}
