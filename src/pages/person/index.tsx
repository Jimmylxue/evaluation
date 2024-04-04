import { navigate } from "@/core/index";
import { Text, View } from "@tarojs/components";
import { AtButton } from "taro-ui";

/**
 * 个人中心
 */
export default function Person() {
  return (
    <View className=" w-screen h-screen flex flex-col justify-center items-center">
      <Text>个人中心</Text>
      <AtButton
        type="secondary"
        circle={true}
        onClick={async () => {
          navigate("/pages/register/index");
        }}
      >
        登录
      </AtButton>
    </View>
  );
}
