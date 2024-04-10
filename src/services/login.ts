import { ClientError } from "@/api/react-query";
import { post } from "@/api/client";
import { UseMutationOptions, useMutation } from "react-query";
import Taro from "@tarojs/taro";
import { TUser } from "src/store/userInfo";

export async function getLoginCode() {
  const res = await Taro.login();
  return res.code;
}

export function useLogin(
  options?: UseMutationOptions<
    { token: string; user: TUser },
    ClientError,
    {
      code: string;
      avatar: string;
      username: string;
    }
  >
) {
  return useMutation<
    { token: string; user: TUser },
    ClientError,
    {
      code: string;
      avatar: string;
      username: string;
    }
  >((data) => post("/user/login_by_mini_program", data), options);
}

export function useUpdateUser(
  options?: UseMutationOptions<
    TUser,
    ClientError,
    Pick<TUser, "id" | "avatar" | "username">
  >
) {
  return useMutation<
    TUser,
    ClientError,
    Pick<TUser, "id" | "avatar" | "username">
  >((data) => post("/user/update", data), options);
}
