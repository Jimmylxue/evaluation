import { Canvas, Image } from "@tarojs/taro";
import { systemInfo } from "../../../common/utils";
import { SourceMap } from "../const";
import { tempImgFile } from "@/subpackages/games/common/tempImgFile";

export class Bg {
  width = systemInfo.screenWidth;
  height = systemInfo.screenHeight;

  treeWidth = 105;
  treeHeight = systemInfo.screenHeight - 100;

  treeBaseWidth = 130;

  /**
   * 背景1
   */
  x1: number = 0;

  _bg: Image;

  _tree: Image;

  treeX = systemInfo.screenWidth / 2 - this.treeWidth / 2;

  _treeBase: Image;

  treeBaseX = systemInfo.screenWidth / 2 - this.treeBaseWidth / 2;

  _treeLeft: Image;

  treeLeftWidth: number = 210;

  treeLeftX: number = this.treeX + this.treeWidth - this.treeLeftWidth;

  _treeRight: Image;

  treeRightWidth: number = 210;

  treeRightX = this.treeX;

  _npc: Image;

  rightNpcX = this.treeBaseX + this.treeBaseWidth;

  npcY = 700;

  npcWidth: number = 100;

  constructor(private canvas: Canvas, private ctx: any) {
    this.init();
  }

  async init() {
    return new Promise((resolve, reject) => {
      this._bg = this.canvas.createImage();
      this._bg.src = tempImgFile.bg;

      this._tree = this.canvas.createImage();
      this._tree.src = tempImgFile.tree;

      this._treeBase = this.canvas.createImage();
      this._treeBase.src = tempImgFile.treeBase;

      this._treeLeft = this.canvas.createImage();
      this._treeLeft.src = tempImgFile.treeLeft;

      this._treeRight = this.canvas.createImage();
      this._treeRight.src = tempImgFile.treeRight;

      this._npc = this.canvas.createImage();
      this._npc.src = tempImgFile.npc;

      setTimeout(() => {
        this.paint();
      }, 500);
    });
  }

  paint() {
    // this.x1--;
    // this.x2--;

    // if (this.x1 === -this.width) {
    //   this.x1 = 0;
    //   this.x2 = this.width - 2;
    // }

    // this.ctx(this.img_source[0], this.x1, 0, this.width, this.height);
    this.ctx.drawImage(this._bg, 0, 0, this.width, this.height);
    // this.ctx.drawImage(this._tree, this.treeX, 0, this.treeWidth, 775);
    // this.ctx.drawImage(
    //   this._treeBase,
    //   systemInfo.screenWidth / 2 - this.treeBaseWidth / 2,
    //   775 - 30,
    //   this.treeBaseWidth,
    //   50
    // );

    // console.log(
    //   this._treeLeft,
    //   systemInfo.screenWidth / 2 - this.treeLeftWidth,
    //   0,
    //   this.treeLeftWidth,
    //   50
    // );
    // this.ctx.drawImage(
    //   this._treeLeft,
    //   this.treeLeftX,
    //   0,
    //   this.treeLeftWidth,
    //   50
    // );

    // this.ctx.drawImage(
    //   this._treeRight,
    //   this.treeRightX,
    //   200,
    //   this.treeRightWidth,
    //   50
    // );

    // this.ctx.drawImage(
    //   this._npc,
    //   this.rightNpcX,
    //   this.npcY,
    //   this.npcWidth,
    //   this.npcWidth
    // );
  }
}
