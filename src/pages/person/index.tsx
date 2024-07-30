import { Image, Text, View } from "@tarojs/components";
import { AtAvatar, AtCurtain, AtIcon } from "taro-ui";
import { useLoginDialog } from "@/components/Login";
import { observer } from "mobx-react-lite";
import { auth } from "@/store/userInfo";
import { FunctionList } from "./const";
import { EmptyButton } from "@/components/EmptyButton";
import { zanShang } from "./core/zanshang";
import { useState } from "react";

/**
 * 个人中心
 */
export default observer(function Person() {
  const { user, isLogin } = auth;
  const { node, showLogin } = useLoginDialog();

  const [showChat, setShowChat] = useState<boolean>(false);

  return (
    <View className=" w-screen h-screen bg-[#f4f4f6] ">
      <View
        className=" w-full h-[400rpx] relative rounded-b-3xl"
        style={{
          background: "linear-gradient(to bottom,#d4d6f1,#edeffb)",
        }}
      >
        <View className=" absolute top-[150rpx] flex w-full justify-between items-center">
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

          {/* <AtIcon value="chevron-right" size="30" color="#bbb"></AtIcon> */}
        </View>
      </View>

      <View className=" px-2 ">
        <View className=" px-4 mt-4 py-4 bg-white shadow-lg rounded">
          <View className=" text-lg font-bold">相关服务</View>
          <View className=" flex justify-between flex-wrap mt-2">
            {FunctionList.map((item, index) => (
              <EmptyButton
                key={index}
                openType={item.openType}
                className=" mb-2 mx-0 size-[140rpx]"
                onClick={item.action}
              >
                <>
                  <View className="bg-[#f9f9f9] py-3 flex justify-center items-center rounded-2xl">
                    <AtIcon
                      value={item.icon}
                      size="30"
                      color="#070920"
                    ></AtIcon>
                  </View>
                  <View className=" text-[#7b7b7b] text-sm mt-1">
                    {item.name}
                  </View>
                </>
              </EmptyButton>
            ))}
            <EmptyButton className=" size-[140rpx]"></EmptyButton>
            <EmptyButton className=" size-[140rpx]"></EmptyButton>
          </View>
        </View>
      </View>

      <View className=" px-2">
        <View className=" px-4 mt-4 py-4 bg-white shadow-lg rounded">
          <View className=" text-lg font-bold">摆烂吧！</View>
          <View className=" text-gray-700 text-justify mt-2">
            欢迎你分享你的偷懒语录、放松技巧和偷懒需求，这对工贼鸭鸭来说至关重要！如果没有灵感，也可以和我聊聊天，分享你的日常趣事~
          </View>
          <View className=" mt-4 flex justify-center">
            <EmptyButton
              className=" mb-2 mx-0 size-[140rpx]"
              onClick={() => {
                setShowChat(true);
              }}
            >
              <>
                <View className="bg-[#f9f9f9] py-3 flex justify-center items-center rounded-2xl">
                  <AtIcon value={"mail"} size="30" color="#070920"></AtIcon>
                </View>
                <View className=" text-[#7b7b7b] text-sm mt-1">联系鸭鸭</View>
              </>
            </EmptyButton>
          </View>
        </View>
      </View>

      {node}
      <AtCurtain
        isOpened={zanShang.showZanShang}
        onClose={() => {
          zanShang.setZanShang(false);
        }}
      >
        <View className=" p-6 bg-[#d4d6f1] flex flex-col justify-center items-center">
          <Image
            className=" size-[500rpx] rounded-full"
            src={zanShang.imgSrc}
          />
          <View className=" text-lg font-bold mt-4">“加油！工贼鸭鸭！”</View>
          <View className=" text-sm text-gray-700 mt-2">吉米的赞赏码</View>
        </View>
      </AtCurtain>

      <AtCurtain
        isOpened={showChat}
        onClose={() => {
          setShowChat(false);
        }}
      >
        <View className=" p-6 bg-[#d4d6f1] flex flex-col justify-center items-center">
          <Image
            className=" size-[500rpx]"
            src="https://image.jimmyxuexue.top/upload/1722324633615wechat.2645f7cf.jpg"
          />
          <View className=" text-lg font-bold mt-4">“加油！工贼鸭鸭！”</View>
          <View className=" text-sm text-gray-700 mt-2">吉米的二维码</View>
        </View>
      </AtCurtain>
    </View>
  );
});
