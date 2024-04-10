import { Text, View } from "@tarojs/components";
import { AtAvatar, AtIcon } from "taro-ui";
import { useLoginDialog } from "@/components/Login";
import { observer } from "mobx-react-lite";
import { auth } from "@/store/userInfo";
import { FunctionList } from "./const";
import { EmptyButton } from "@/components/EmptyButton";

/**
 * 个人中心
 */
export default observer(function Person() {
  const { user, isLogin } = auth;
  const { node, showLogin } = useLoginDialog();
  return (
    <View className=" w-screen h-screen ">
      <View
        className=" w-full h-[400rpx] relative rounded-b-3xl"
        style={{
          background: "linear-gradient(to bottom,#d4d6f1,#edeffb)",
        }}
      >
        <View className=" absolute top-[100rpx] flex w-full justify-between items-center">
          {!isLogin ? (
            <View className=" flex items-center px-3 my-3">
              <AtAvatar circle text="凹凸实验室"></AtAvatar>
              <Text className=" ml-2" onClick={() => showLogin("register")}>
                点击前往登录
              </Text>
            </View>
          ) : (
            <View className=" flex items-center px-3 my-3">
              <AtAvatar
                circle
                text="凹凸实验室"
                image={user?.avatar}
              ></AtAvatar>
              <Text className=" ml-2" onClick={() => showLogin("update", user)}>
                {user?.username}
              </Text>
            </View>
          )}

          <AtIcon value="chevron-right" size="30" color="#bbb"></AtIcon>
        </View>
      </View>

      <View className=" px-4 mt-4">
        <View>相关服务</View>
        <View className=" flex justify-between flex-wrap mt-2">
          {FunctionList.map((item, index) => (
            <EmptyButton key={index} openType={item.openType}>
              <View>
                <View className=" size-[140rpx] bg-[#f9f9f9] flex justify-center items-center rounded-2xl">
                  <AtIcon value={item.icon} size="30" color="#070920"></AtIcon>
                </View>
                <View className=" text-[#7b7b7b] text-sm mt-1">
                  {item.name}
                </View>
              </View>
            </EmptyButton>
          ))}
          <View className=" flex flex-col justify-center items-center size-[140rpx]"></View>
          <View className=" flex flex-col justify-center items-center size-[140rpx]"></View>
        </View>
      </View>
      {node}
    </View>
  );
});
