import { useAuthConfirm } from "@/services/scanAuth";
import { auth } from "@/store/userInfo";
import { showToast } from "@/utils/notice";
import { View, Text, Image } from "@tarojs/components";
import { useRouter, navigateBack } from "@tarojs/taro";
import { observer } from "mobx-react-lite";

export default observer(function ScanAuth() {
  const { user, isLogin } = auth;

  const { params } = useRouter<{
    qr_id: string;
  }>();

  const { qr_id } = params;

  const { mutateAsync } = useAuthConfirm({
    onSuccess: () => {
      showToast({ title: "授权成功", icon: "none" });
      navigateBack();
    },
    onError: (err) => {
      console.log("err", err);
    },
  });

  // 模拟从二维码获取的应用信息
  const appInfo = {
    name: "工贼鸭鸭",
    avatar:
      "https://image.jimmyxuexue.top/upload/1722324633615wechat.2645f7cf.jpg",
    description: "一个专注于工作与生活的平衡助手",
  };

  // 模拟用户信息
  const userInfo = {
    name: "吉米",
    avatar: "https://image.jimmyxuexue.top/avatar/default-avatar.jpg",
  };

  // 授权处理函数
  const handleConfirm = () => {
    console.log("用户确认授权");
    // 这里处理授权逻辑
  };

  const handleCancel = () => {
    console.log("用户取消授权");
    // 这里处理取消逻辑
  };

  return (
    <View className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 中间授权区域 */}
      <View className="flex-1 px-4 pt-4">
        {/* 应用卡片 */}
        <View className="bg-white rounded-3xl shadow-sm p-6 mb-8 ">
          <View className="flex items-center mb-6">
            <Image
              className="w-16 h-16 rounded-2xl shadow-md"
              src={appInfo.avatar}
              mode="aspectFill"
            />
            <View className="ml-4 flex-1">
              <Text className="text-lg font-semibold text-gray-800 block">
                {appInfo.name}
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                申请获取以下权限
              </Text>
            </View>
          </View>

          <View className="border-t border-gray-100 pt-4">
            <View className="flex items-center py-3">
              <View className="w-2 h-2 bg-blue-500 rounded-full mr-3"></View>
              <Text className="text-gray-700">
                获得你的公开信息（昵称、头像等）
              </Text>
            </View>
            <View className="flex items-center py-3">
              <View className="w-2 h-2 bg-blue-500 rounded-full mr-3"></View>
              <Text className="text-gray-700">同步你的学习进度和设置</Text>
            </View>
          </View>
        </View>

        {/* 用户信息确认 */}
        <View className="bg-white rounded-3xl shadow-sm p-6">
          <Text className="text-center text-gray-500 text-sm mb-4">
            你将授权以下账号信息
          </Text>

          <View className="flex flex-col items-center">
            <Image
              className="w-20 h-20 rounded-full border-4 border-blue-100 shadow-md"
              src={user?.avatar!}
              mode="aspectFill"
            />
            <Text className="text-lg font-semibold text-gray-800 mt-4">
              {user?.nickname}
            </Text>
            <Text className="text-sm text-gray-500 mt-2">
              确认授权此账号登录
            </Text>
          </View>
        </View>
      </View>

      {/* 底部按钮 */}
      <View className="fixed bottom-0 left-0 right-0 p-8 bg-white border-t border-gray-100">
        <View className="flex space-x-4">
          <View
            className="flex-1 bg-gray-100 rounded-2xl py-4 active:bg-gray-200 transition-colors text-center"
            onClick={handleCancel}
          >
            <Text className="text-center text-gray-600 font-medium text-lg ">
              取消
            </Text>
          </View>
          <View
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl py-4 active:from-blue-600 active:to-blue-700 transition-all shadow-md text-center"
            onClick={handleConfirm}
          >
            <Text
              className="text-center text-white font-medium text-lg"
              onClick={async () => {
                await mutateAsync({ qr_id });
              }}
            >
              确认登录
            </Text>
          </View>
        </View>

        <View className=" flex justify-center">
          <Text className="text-center text-gray-400 text-xs mt-4 mx-auto">
            授权后即表示你已同意《用户协议》和《隐私政策》
          </Text>
        </View>
      </View>
    </View>
  );
});
