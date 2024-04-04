import Taro from "@tarojs/taro";

export function showToast(option: Taro.showToast.Option) {
  return Taro.showToast(option);
}
