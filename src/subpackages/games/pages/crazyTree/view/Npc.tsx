import { Canvas, Image } from "@tarojs/taro";
import { systemInfo } from "../../../common/utils";
import { SourceMap } from "../const";

export class Npc {
  width = 100;
  height = 100;
  position: "right" | "left" = "right";
  _npc: Image;

  _workNpc: Image;

  _dieNpc: Image;

  x: number = 0;
  y: number = systemInfo.screenHeight - this.height - 50;

  working: boolean = false;

  isDie: boolean = false;

  constructor(private canvas: Canvas, private ctx: any) {
    this._npc = this.canvas.createImage();
    this._npc.src = SourceMap.npc;

    this._workNpc = this.canvas.createImage();
    this._workNpc.src = SourceMap.npcMove;

    this._dieNpc = this.canvas.createImage();
    this._dieNpc.src = SourceMap.npcDie;
  }

  updatePosition(position: "right" | "left") {
    this.position = position;
  }

  paint() {
    let _npcImage = this.working ? this._workNpc : this._npc;
    if (this.isDie) {
      _npcImage = this._dieNpc;
    }
    if (this.position === "right") {
      this.x = systemInfo.screenWidth / 2 + 50;
      this.ctx.drawImage(_npcImage, this.x, this.y, this.width, this.height);
    } else {
      this.x = systemInfo.screenWidth / 2 - this.width - 40;
      this.ctx.save(); // 保存当前状态
      this.ctx.scale(-1, 1); // 水平翻转
      this.ctx.drawImage(
        _npcImage,
        -this.x - this.width,
        this.y,
        this.width,
        this.height
      ); // 绘制镜像图像
      this.ctx.restore();
    }
  }
}
