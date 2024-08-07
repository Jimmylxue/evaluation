import { depBetween, generateGroup, obstacleMoveSpeed } from "../core/core";
import { systemInfo } from "../../../common/utils";
import { Bg } from "./Bg";
import { Bird } from "./Bird";
import { Obstacle } from "./Obstacle";
import { Score } from "./Score";

export class Display {
  /**
   * 全局维护的帧动画定时器
   */
  animateTimer: number;

  obstacles: Obstacle[] = [];

  score: Score;

  private bg: Bg;

  constructor(private ctx: Taro.CanvasContext, private bird: Bird) {
    for (let i = 0; i < 4; i++) {
      const { upHeight, downHeight } = generateGroup();
      const x = (i + 1) * depBetween + systemInfo.windowWidth;
      const obstacle1 = new Obstacle(ctx, "up", upHeight, x);
      const obstacle2 = new Obstacle(ctx, "down", downHeight, x);
      this.obstacles.push(obstacle1, obstacle2);
    }
    this.bg = new Bg(ctx);
    this.score = new Score(ctx);
  }

  /**
   * 检查是否需要更改 水管的高度位置
   */
  checkChangeObstacle() {
    const checkIndex = this.obstacles.findIndex((obstacle) => {
      if (obstacle.x <= -obstacle.width) {
        return true;
      }
    });
    if (checkIndex !== -1) {
      const { upHeight, downHeight } = generateGroup();
      const upObstacles = this.obstacles[checkIndex];
      const downObstacles = this.obstacles[checkIndex + 1];
      upObstacles.x = 4 * depBetween - upObstacles.width;
      downObstacles.x = 4 * depBetween - downObstacles.width;
      upObstacles.height = upHeight;
      downObstacles.height = downHeight;
      downObstacles.y = systemInfo.screenHeight - downHeight;
    }
  }

  /**
   * 碰撞检测
   * 小鸟的 y 不在两个水管之间 则视为碰撞
   */
  checkCollision() {
    /**
     * 需要检查的区域
     */
    const checkMinX = this.bird.x;
    const checkMaxX = this.bird.x + this.bird.width;
    const checkObstacleIndex = this.obstacles.findIndex((obstacle) => {
      const xMin = obstacle.x;
      const xMax = obstacle.x + obstacle.width;
      if (
        (xMin >= checkMinX && xMin <= checkMaxX) ||
        (xMax >= checkMinX && xMax <= checkMaxX)
      ) {
        return true;
      }
    });
    if (checkObstacleIndex !== -1) {
      const checkMinY = this.obstacles[checkObstacleIndex].height;
      const checkMaxY = this.obstacles[checkObstacleIndex + 1].y;
      if (
        !(
          this.bird.y >= checkMinY &&
          this.bird.y + this.bird.height <= checkMaxY
        )
      ) {
        this.bird.isCollision = true;
      }
      /**
       * 这个判断 感觉 可能会有点问题
       */
      const xMax =
        this.obstacles[checkObstacleIndex].x +
        this.obstacles[checkObstacleIndex].width;
      if (xMax - obstacleMoveSpeed < this.bird.x) {
        this.score.addScore();
      }
    }
  }

  /**
   * 开始游戏的事件
   */
  play(overFn: (score: number) => void) {
    const animate = () => {
      this.ctx.clearRect(0, 0, systemInfo.screenWidth, systemInfo.screenHeight);
      this.checkChangeObstacle();
      this.animateTimer = requestAnimationFrame(animate);
      this.bg.paint();
      this.obstacles.forEach((obstacle) => obstacle.paint());
      this.bird.paint();
      this.score.painScore();
      this.ctx.draw();
      this.checkCollision();

      if (this.bird.isCollision) {
        cancelAnimationFrame(this.animateTimer);
        this.ctx.clearRect(
          0,
          0,
          systemInfo.screenWidth,
          systemInfo.screenHeight
        );
        overFn(this.score.score);
      }

      // 游戏结束了
      //
    };

    animate();
  }
}
