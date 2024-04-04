import { useBingBg } from "@/services/login";
import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";
import { observer } from "mobx-react-lite";
import { auth } from "@/store/userInfo";

export default observer(function Index() {
  const { data } = useBingBg(["bingBg"], {});
  console.log("data", data);
  return (
    <View className="index">
      <Text className=" text-red-400">Hello world!</Text>
      <Text>测评统计</Text>
      <View>
        <Text>用户信息：{JSON.stringify(auth.user)}</Text>
      </View>
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
});
