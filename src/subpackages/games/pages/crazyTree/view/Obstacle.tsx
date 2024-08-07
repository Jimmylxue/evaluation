import { Canvas, Image } from "@tarojs/taro";
import { systemInfo } from "../../../common/utils";
import { SourceMap } from "../const";

export class Obstacle {
  centerWidth = 100;

  leftWidth = 210;

  rightWidth = 210;

  height = 100;
  _tree: Image;

  working: boolean = false;

  centerTreeX = systemInfo.screenWidth / 2 - this.centerWidth / 2 - 2;

  treeLeftX: number = this.centerTreeX + this.centerWidth - this.leftWidth + 2;

  treeRightX: number = this.centerTreeX - 4;

  constructor(
    private canvas: Canvas,
    private ctx: any,
    public y,
    public type: "right" | "left" | "center"
  ) {
    this._tree = this.canvas.createImage();
    this.updateTreeType(this.type);
  }

  get x() {
    if (this.type === "left") {
      return this.treeLeftX;
    } else if (this.type === "center") {
      return this.centerTreeX;
    } else {
      return this.treeRightX;
    }
  }

  get width() {
    if (this.type === "left") {
      return this.leftWidth;
    } else if (this.type === "center") {
      return this.centerWidth;
    } else {
      return this.rightWidth;
    }
  }

  paint() {
    this.ctx.drawImage(this._tree, this.x, this.y, this.width, this.height);
  }

  updateTreeType(type: "right" | "left" | "center") {
    this.type = type;
    if (this.type === "left") {
      this._tree.src = SourceMap.treeLeft;
    } else if (this.type === "center") {
      this._tree.src = SourceMap.tree;
    } else {
      this._tree.src = SourceMap.treeRight;
    }
  }
}
