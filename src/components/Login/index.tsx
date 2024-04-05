import { Button, Input, Text, View } from "@tarojs/components";
import { useRef, useState } from "react";
import { AtAvatar, AtButton, AtFloatLayout } from "taro-ui";
import "./index.scss";
import { getLoginCode, useLogin, useUpdateUser } from "@/services/login";
import { showToast } from "@/utils/notice";
import Taro from "@tarojs/taro";
import { parseJson } from "@/utils/index";
import { TUser, auth } from "@/store/userInfo";

type TUserInfo = {
  avatar: string;
  username: string;
};

type TFormType = "register" | "update";

export function useLoginDialog() {
  const [show, setShow] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<TUserInfo>({
    avatar: "",
    username: "",
  });
  const modalType = useRef<TFormType>("register");
  const _user = useRef<TUser>();
  const { mutateAsync } = useLogin({
    onSuccess: () => {
      showToast({ title: "登录成功" });
      closeLogin();
    },
  });

  const { mutateAsync: updateUser } = useUpdateUser({
    onSuccess: () => {
      showToast({ title: "修改成功" });
      auth.setUser({ ..._user.current!, ...userInfo });
      closeLogin();
    },
  });

  const showLogin = (type: TFormType, userInfo?: TUser) => {
    modalType.current = type;
    if (type === "update") {
      _user.current = userInfo;
      setUserInfo({
        avatar: userInfo?.avatar!,
        username: userInfo?.username!,
      });
    }
    setShow(true);
  };

  const closeLogin = () => {
    setShow(false);
  };
  const node = (
    <View className="my-login">
      <AtFloatLayout isOpened={show} onClose={() => setShow(false)}>
        <View className=" flex h-full w-full justify-center items-center flex-col py-5">
          <Button
            className=" bg-none bg-transparent p-0 rounded-full"
            openType="chooseAvatar"
            onChooseAvatar={(e) => {
              const { avatarUrl } = e.detail;
              Taro.uploadFile({
                url: "https://api.jimmyxuexue.top/upload",
                // url: "http://127.0.0.1:9999/upload",
                filePath: avatarUrl,
                name: "file",
                formData: {},
                success(res) {
                  const data = parseJson<{ result: string }>(res.data);
                  setUserInfo({ ...userInfo, avatar: data?.result! });
                },
              });
            }}
          >
            <AtAvatar
              circle
              text="凹凸实验室"
              image={userInfo.avatar}
            ></AtAvatar>
          </Button>
          <Input
            placeholder="请输入名字"
            className=" border border-solid border-transparent w-1/2 py-2 rounded-lg my-4 text-center bg-[#f6f6f6] "
            value={userInfo.username}
            onInput={(e) => {
              console.log("ee", e);
              setTimeout(() => {
                setUserInfo({ ...userInfo, username: e.detail.value });
              });
            }}
            // @ts-ignore
            type="nickname"
            onBlur={(e) => {
              console.log("blur", e);
            }}
          />
          <AtButton
            className=" w-1/2"
            type="primary"
            onClick={async () => {
              if (modalType.current === "register") {
                const code = await getLoginCode();
                await mutateAsync({ ...userInfo, code });
              } else {
                await updateUser({
                  ...userInfo,
                  id: _user.current?.id!,
                });
              }
            }}
          >
            {modalType.current === "register" ? "立即登录" : "立即修改"}
          </AtButton>
          <Text className=" text-[#aeaeae] mt-3" onClick={closeLogin}>
            取消
          </Text>
        </View>
      </AtFloatLayout>
    </View>
  );

  return { node, showLogin, closeLogin };
}
