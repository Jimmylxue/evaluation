import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";

import "taro-ui/dist/style/components/button.scss"; // 按需引入

export default function Index() {
  return (
    <View className="index">
      <Text className=" text-red-400">Hello world!</Text>
      <Text>测评统计</Text>
      <AtButton
        type="secondary"
        circle={true}
        onClick={() => {
          console.log("同意");
        }}
      >
        开始测评
      </AtButton>
    </View>
  );
}
