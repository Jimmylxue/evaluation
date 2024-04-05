import { ClientError } from "@/api/react-query";
import { get, post } from "@/api/client";
import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "react-query";
import Taro from "@tarojs/taro";
import { TUser } from "src/store/userInfo";

type TBingImageItem = {
  startdate: string;
  fullstartdate: string;
  enddate: string;
  url: string;
  urlbase: string;
  copyright: string;
  copyrightlink: string;
  title: string;
  quiz: string;
  wp: boolean;
  hsh: string;
  drk: number;
  top: number;
  bot: number;
};

export type TBingImageList = {
  images: TBingImageItem[];
};

export function useBingBg(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TBingImageList, ClientError>
) {
  return useQuery<TBingImageList, ClientError>(
    queryKey,
    () => get("/bingBg/weekList", variable),
    config
  );
}

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
