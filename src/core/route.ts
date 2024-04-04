import Taro from "@tarojs/taro";

export function navigate(url: string) {
  return Taro.navigateTo({
    url,
  });
}
