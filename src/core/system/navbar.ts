import Taro from "@tarojs/taro";
import { useState } from "react";

export function useNavBarHeight() {
  const statusBarHeight = Taro.getSystemInfoSync().statusBarHeight || 0;

  const [height] = useState(() => {
    const menuButtonInfo = Taro.getMenuButtonBoundingClientRect();
    if (!menuButtonInfo) return 0;

    if (!menuButtonInfo?.height && menuButtonInfo.top < 0) {
      return 2 * Math.abs(menuButtonInfo.top) - statusBarHeight;
    }

    return (
      (menuButtonInfo.top - statusBarHeight) * 2 +
      menuButtonInfo?.height +
      statusBarHeight
    );
  });
  return { height, statusBarHeight };
}
