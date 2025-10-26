import { Image, Text, View } from "@tarojs/components";
import { AtAvatar, AtCurtain, AtIcon } from "taro-ui";
import { useLoginDialog } from "@/components/Login";
import { observer } from "mobx-react-lite";
import { auth } from "@/store/userInfo";
import { FunctionList } from "./const";
import { EmptyButton } from "@/components/EmptyButton";
import { zanShang } from "./core/zanshang";
import { useState } from "react";
import { scanCode, navigateTo } from "@tarojs/taro";
import { showToast } from "@/utils/notice";
import { useAuthScan } from "@/services/scanAuth";

/**
 * 个人中心
 */
export default observer(function Person() {
  const { user, isLogin } = auth;
  const { node, showLogin } = useLoginDialog();

  const [showChat, setShowChat] = useState<boolean>(false);

  const { mutateAsync } = useAuthScan();

  return (
    <View className="w-full min-h-screen bg-gradient-to-b from-[#f0f2ff] to-[#f8f9ff]">
      {/* 顶部用户信息区域 */}
      <View className="w-full h-[450rpx] relative overflow-hidden">
        <View
          className="absolute inset-0 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]"
          style={{
            borderBottomLeftRadius: "40rpx",
            borderBottomRightRadius: "40rpx",
          }}
        >
          <View className="absolute inset-0 opacity-10 bg-white"></View>
        </View>

        {/* 用户信息卡片 */}
        <View className="absolute top-[200rpx] left-1/2 transform -translate-x-1/2 w-11/12 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6">
          <View className="flex items-center">
            <View className="relative">
              <AtAvatar
                circle
                size="large"
                text="凹凸实验室"
                image={isLogin ? user?.avatar : ""}
                className="border-4 border-white shadow-md"
              />
              <View className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></View>
            </View>
            <View className="ml-4 flex-1">
              {!isLogin ? (
                <Text className="text-xl font-bold text-gray-800">未登录</Text>
              ) : (
                <Text className="text-xl font-bold text-gray-800">
                  {user?.nickname}
                </Text>
              )}
              {/* <Text
                className="text-sm text-blue-500 mt-1 inline-block"
                onClick={() =>
                  isLogin ? showLogin("update", user) : showLogin("register")
                }
              >
                {isLogin ? "编辑资料" : "点击登录"}
              </Text> */}
            </View>
            <AtIcon value="chevron-right" size="20" color="#9ca3af"></AtIcon>
          </View>
        </View>
      </View>

      {/* 服务功能区 */}
      <View className="px-4 mt-4">
        <View className="bg-white rounded-3xl shadow-sm p-6 mb-4">
          <View className="flex items-center mb-4">
            <View className="w-1 h-5 bg-gradient-to-b from-[#6366f1] to-[#8b5cf6] rounded-full mr-2"></View>
            <Text className="text-lg font-bold text-gray-800">相关服务</Text>
          </View>

          <View className="grid grid-cols-4 gap-4">
            {FunctionList.map((item, index) => (
              <EmptyButton
                key={index}
                openType={item.openType}
                className="flex flex-col items-center justify-center"
                onClick={async () => {
                  if (item.name === "扫一扫") {
                    const res = await scanCode({});
                    console.log("res", res);
                    try {
                      const scanResult = JSON.parse(res.result);
                      if (scanResult.type === "login") {
                        const { qr_id } = scanResult;
                        mutateAsync({ qr_id }).then(() => {
                          navigateTo({
                            url: `/subpackages/scanAuth/pages/index/index?qr_id=${qr_id}`,
                          });
                        });
                      }
                    } catch (error) {
                      showToast({ title: "请扫描正确二维码", icon: "none" });
                    }
                  } else {
                    item.action?.();
                  }
                }}
              >
                <View className="w-16 h-16 bg-gradient-to-br from-[#f0f2ff] to-[#e0e7ff] flex items-center justify-center rounded-2xl shadow-sm transition-all active:scale-95">
                  <AtIcon value={item.icon} size="24" color="#6366f1"></AtIcon>
                </View>
                <Text className="text-xs text-gray-600 mt-2 text-center">
                  {item.name}
                </Text>
              </EmptyButton>
            ))}
          </View>
        </View>

        {/* 联系区域 */}
        <View className="bg-white rounded-3xl shadow-sm p-6 mb-4">
          <View className="flex items-center mb-4">
            <View className="w-1 h-5 bg-gradient-to-b from-[#f59e0b] to-[#d97706] rounded-full mr-2"></View>
            <Text className="text-lg font-bold text-gray-800">摆烂吧！</Text>
          </View>

          <View className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 mb-4">
            <Text className="text-sm text-gray-700 leading-6">
              欢迎你分享你的偷懒语录、放松技巧和偷懒需求，这对工贼鸭鸭来说至关重要！如果没有灵感，也可以和我聊聊天，分享你的日常趣事~
            </Text>
          </View>

          <View className="flex justify-center">
            <EmptyButton
              className="flex flex-col items-center justify-center"
              onClick={() => setShowChat(true)}
            >
              <View className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center rounded-2xl shadow-sm transition-all active:scale-95">
                <AtIcon value="mail" size="24" color="#f59e0b"></AtIcon>
              </View>
              <Text className="text-xs text-gray-600 mt-2">联系鸭鸭</Text>
            </EmptyButton>
          </View>
        </View>
      </View>

      {/* 弹窗组件 */}
      {node}

      <AtCurtain
        isOpened={zanShang.showZanShang}
        onClose={() => zanShang.setZanShang(false)}
      >
        <View className="p-8 bg-white flex flex-col justify-center items-center rounded-3xl mx-4">
          <Image
            className="w-64 h-64 rounded-2xl shadow-lg"
            src={zanShang.imgSrc}
            mode="aspectFit"
          />
          <Text className="text-lg font-bold mt-6 text-gray-800">
            "加油！工贼鸭鸭！"
          </Text>
          <Text className="text-sm text-gray-500 mt-2">吉米的赞赏码</Text>
        </View>
      </AtCurtain>

      <AtCurtain isOpened={showChat} onClose={() => setShowChat(false)}>
        <View className="p-8 bg-white flex flex-col justify-center items-center rounded-3xl mx-4">
          <Image
            className="w-64 h-64 rounded-2xl shadow-lg"
            src="https://image.jimmyxuexue.top/upload/1722324633615wechat.2645f7cf.jpg"
            mode="aspectFit"
          />
          <Text className="text-lg font-bold mt-6 text-gray-800">
            "加油！工贼鸭鸭！"
          </Text>
          <Text className="text-sm text-gray-500 mt-2">吉米的二维码</Text>
        </View>
      </AtCurtain>
    </View>
  );
});
