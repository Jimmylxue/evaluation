import { Canvas } from "@tarojs/taro";
import { Bg } from "./Bg";
import { TreeBase } from "./TreeBase";
import { systemInfo } from "@/subpackages/games/common/utils";
import { Npc } from "./Npc";
import { Obstacle } from "./Obstacle";
import { Score } from "./Score";
import { Blood } from "./Blood";

const typeMap = {
  0: "left",
  1: "center",
  2: "right",
};

export class Display {
  bg: Bg;

  treeBase: TreeBase;

  animateTimer: number;

  npc: Npc;

  obstacles: Obstacle[] = [];

  score: Score;

  blood: Blood;

  constructor(private canvas: Canvas, private ctx: any) {
    this.bg = new Bg(canvas, ctx);
    this.treeBase = new TreeBase(canvas, ctx);
    this.npc = new Npc(canvas, ctx);

    this.score = new Score(ctx);

    this.blood = new Blood(ctx);

    const initY = this.treeBase.y + 10;

    for (let i = 1; i <= 10; i++) {
      let obstacle = new Obstacle(
        canvas,
        ctx,
        initY - i * 100,
        i <= 3 ? "center" : typeMap[Math.floor(Math.random() * 3)]
      );
      Math.floor(Math.random() * 3);
      this.obstacles.push(obstacle);
    }
  }

  play(fn: () => void) {
    const renderLoop = () => {
      this.animateTimer = this.canvas.requestAnimationFrame(renderLoop);
      this.render();
      if (this.npc.isDie || this.blood.isTimeOut) {
        setTimeout(() => {
          this.canvas.cancelAnimationFrame(this.animateTimer);
          fn();
        }, 30);
      }
    };
    renderLoop();
  }

  render() {
    this.ctx.clearRect(0, 0, systemInfo.screenWidth, systemInfo.screenHeight);
    this.bg.paint();
    this.treeBase.paint();
    this.npc.paint();
    this.obstacles.forEach((obstacle) => obstacle.paint());
    this.blood.paint();
    this.score.paint();
  }

  click(point: { x: number; y: number }) {
    const clickPosition =
      point.x <= systemInfo.screenWidth / 2 ? "left" : "right";
    const npcPosition = this.npc.position;
    const isAttack = clickPosition === npcPosition;
    if (isAttack) {
      this.npc.working = true;
      this.obstacles.forEach((item, index) => {
        if (index === 0) {
          item.y = this.obstacles[9].y;
        } else {
          item.y = item.y + 100;
        }
      });
      const lastElement = this.obstacles.shift();
      this.obstacles.push(lastElement!);

      if (lastElement?.type === this.npc.position) {
        // 相撞了
        this.npc.isDie = true;
      } else {
        this.blood.bloodWidth += 2;
        if (this.blood.bloodWidth > this.blood.maxBloodWidth) {
          this.blood.bloodWidth = this.blood.maxBloodWidth;
        }
        this.score.addScore();
      }

      lastElement?.updateTreeType(typeMap[Math.floor(Math.random() * 3)]);

      setTimeout(() => {
        this.npc.working = false;
      }, 100);
    } else {
      this.npc.updatePosition(npcPosition === "left" ? "right" : "left");
    }
  }
}
