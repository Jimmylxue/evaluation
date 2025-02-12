import { View } from "@tarojs/components";
import "./index.scss";

export default function StarryBackground() {
  return (
    <View className="starry-background">
      <View className="stars" />
      <View className="overlay" />
    </View>
  );
}
