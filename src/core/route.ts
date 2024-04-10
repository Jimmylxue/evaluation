import Taro from "@tarojs/taro";

export function navigate(url: string) {
  return Taro.navigateTo({
    url,
  });
}

export function switchTab(url: string) {
  return Taro.switchTab({
    url,
  });
}
