import { post } from "@/api/client";
import Taro from "@tarojs/taro";
import { TUser } from "src/store/userInfo";
import { ClientError } from "@/api/ApiProvider";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export async function getLoginCode() {
  const res = await Taro.login();
  return res.code;
}

export const useLogin = (
  config?: UseMutationOptions<
    { token: string; user: TUser },
    ClientError,
    {
      code: string;
      avatar: string;
      username: string;
    }
  >
) => {
  return useMutation<
    { token: string; user: TUser },
    ClientError,
    {
      code: string;
      avatar: string;
      username: string;
    }
  >({
    mutationFn: async (data) => {
      const response: any = await post("/user/login_by_mini_program", data);
      console.log("response", response);
      return response;
    },
    ...config,
  });
};

export const useUpdateUser = (
  config?: UseMutationOptions<
    TUser,
    ClientError,
    Pick<TUser, "id" | "avatar" | "username">
  >
) => {
  return useMutation<
    TUser,
    ClientError,
    Pick<TUser, "id" | "avatar" | "username">
  >({
    mutationFn: async (data) => {
      const response: any = await post("/user/login_by_mini_program", data);
      console.log("response", response);
      return response;
    },
    ...config,
  });
};
