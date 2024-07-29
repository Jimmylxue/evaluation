import Taro from "@tarojs/taro";

export type TPage =
  | "/pages/index/index"
  | "/pages/wallpaper/index"
  | "/pages/person/index"
  | "/pages/register/index"
  | "/pages/timeManager/index"
  | "/pages/luckDraw/index";

export function navigate(url: TPage) {
  return Taro.navigateTo({
    url,
  });
}

export function switchTab(url: string) {
  return Taro.switchTab({
    url,
  });
}
