import { downloadFile, getSystemInfoSync } from "@tarojs/taro";

export let systemInfo = getSystemInfoSync();

// 使用 远程图片 转为本地临时图片
export const getImgFromRemote = (url: string): Promise<string> => {
  console.log("url", url);
  return new Promise((resolve, reject) => {
    try {
      downloadFile({
        url,
        success: (res) => {
          resolve(res.tempFilePath);
        },
      });
    } catch (error) {
      reject(error);
    }
  });
};

// px 转 rem 适配canvas
export const remSize = (num: number) => {
  const scale = systemInfo?.screenWidth / 390;
  return num * scale;
};

/**
 * 获取两个数值之间的随机数
 */
export function getRandomBetween(min: number, max: number) {
  // 确保min和max是数字类型
  if (typeof min !== "number" || typeof max !== "number") {
    throw new Error("Both arguments must be numbers");
  }

  // 生成随机数
  return Math.random() * (max - min) + min;
}
