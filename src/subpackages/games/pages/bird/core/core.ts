import { getRandomBetween, systemInfo } from "../utils";

/**
 * 水管的移动速度
 */
export const obstacleMoveSpeed = 2;

/**
 * 两个水管之间的高度
 */
const depHeight = 150;

/**
 * 上水管最小高度
 */
const minTopHeight = 150;

/**
 * 上水管最大高度
 */
const maxTopHeight = systemInfo.windowHeight - depHeight - minTopHeight;

/**
 * 水管横向之间的距离
 */
export const depBetween = 250;

/**
 * 生成一组数据
 */
export function generateGroup() {
  const upHeight = getRandomBetween(minTopHeight, maxTopHeight);
  const downHeight = systemInfo.screenHeight - upHeight - depHeight;
  return { upHeight, downHeight };
}
