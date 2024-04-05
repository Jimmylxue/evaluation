import { Text, View } from "@tarojs/components";
import { AtAvatar } from "taro-ui";
import { useLoginDialog } from "@/components/Login";
import { observer } from "mobx-react-lite";
import { auth } from "@/store/userInfo";

/**
 * 个人中心
 */
export default observer(function Person() {
  const { user, isLogin } = auth;
  const { node, showLogin } = useLoginDialog();
  return (
    <View className=" w-screen h-screen ">
      {!isLogin ? (
        <View className=" flex items-center px-3 my-3">
          <AtAvatar circle text="凹凸实验室"></AtAvatar>
          <Text className=" ml-2" onClick={() => showLogin("register")}>
            点击前往登录
          </Text>
        </View>
      ) : (
        <View className=" flex items-center px-3 my-3">
          <AtAvatar circle text="凹凸实验室" image={user?.avatar}></AtAvatar>
          <Text className=" ml-2" onClick={() => showLogin("update", user)}>
            {user?.username}
          </Text>
        </View>
      )}
      {node}
    </View>
  );
});
