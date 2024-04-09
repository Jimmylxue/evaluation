import { Button, View } from "@tarojs/components";
import { AtAvatar, AtButton, AtForm, AtInput } from "taro-ui";

import { useState } from "react";
import { getLoginCode, useLogin } from "@/services/login";
import { showToast } from "@/utils/notice";

type TUserInfo = {
  avatar: string;
  username: string;
};

export default function Register() {
  const [userInfo, setUserInfo] = useState<TUserInfo>({
    avatar: "",
    username: "",
  });
  const { mutateAsync } = useLogin({
    onSuccess: () => {
      showToast({ title: "登录成功" });
    },
  });
  return (
    <View className=" relative h-screen">
      <View className=" flex flex-col justify-center items-center">
        <AtAvatar text="凹凸实验室" image={userInfo.avatar}></AtAvatar>
        <Button
          className=" my-2"
          open-type="chooseAvatar"
          size="mini"
          onChooseAvatar={(e) => {
            setUserInfo({ ...userInfo, avatar: e.detail?.avatarUrl! });
          }}
        >
          修改头像
        </Button>
      </View>

      <AtForm>
        <AtInput
          name="value4"
          title="昵称"
          // @ts-ignore
          type="nickname"
          placeholder="点击获取昵称"
          value={userInfo.username}
          onChange={(e) => {
            setUserInfo({ ...userInfo, username: String(e) });
          }}
        />
      </AtForm>

      <View className=" absolute w-full left-0 bottom-0">
        <AtButton
          type="secondary"
          circle={true}
          onClick={async () => {
            const code = await getLoginCode();
            await mutateAsync({ ...userInfo, code });
          }}
        >
          立即注册
        </AtButton>
      </View>
    </View>
  );
}
