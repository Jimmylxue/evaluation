import { View } from "@tarojs/components";
import "./index.scss";

export function Loading() {
  return (
    <View className="loader-container">
      <View className="loader"></View>
      <View className="loader-text">Loading...</View>
    </View>
  );
}
