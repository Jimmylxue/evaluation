import Taro from "@tarojs/taro";
import { showToast } from "@/utils/notice";
import { getLoginCode } from "@/services/login";
import { getLaunchInfo } from "./system";
import { auth } from "@/store/userInfo";

type TBaseRequest = {
  url: string;
  method?: "GET" | "POST";
  data: any;
};

type RequestMethod =
  | "OPTIONS"
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "TRACE"
  | "CONNECT";

enum ErrorCode {
  TOKEN_EXPIRED = 401,
}

// const APP_ENV = process.env.APP_ENV || "dev";
const APP_ENV: any = "prod";

let serverUrl: string;

function getRequestUrl(url: string) {
  // const serverUrl = 'https://api.jimmyxuexue.top'
  serverUrl = "http://127.0.0.1:9999";
  if (APP_ENV === "dev") {
    serverUrl = "http://127.0.0.1:9999";
  } else {
    serverUrl = "https://api.jimmyxuexue.top";
  }
  return `${serverUrl}${url}`;
}

export function makeAuthHeader(token?: string) {
  const header: any = {
    // channel: 1,
  };
  if (token) {
    header["Authorization"] = "Bearer " + token;
  }
  return header;
}

class AsyncLock {
  #locking: boolean;
  #resolve?: (val: void) => void;
  #promise: Promise<void> | null;
  constructor() {
    this.#promise = null;
    this.#locking = false;
  }

  async acquire() {
    // 锁被占用
    if (this.#locking) {
      if (!this.#promise) {
        this.#promise = new Promise((resolve) => {
          this.#resolve = resolve;
        });
      }
      return await this.#promise;
    } else {
      this.#locking = true;
      return;
    }
  }
  release() {
    this.#resolve?.();
    this.#promise = null;
    this.#locking = false;
  }
}

let loginLock = new AsyncLock();

async function fetch(option: Taro.request.Option) {
  const res = await Taro.request(option);
  if (res.statusCode !== 200 || res.data.code !== 200) {
    showToast({ title: res.data?.message || res.data?.result });
    throw {
      statusCode: res.statusCode,
      ...res.data,
    };
  }

  return res.data.result;
}

async function loginRequiredRequest({
  url,
  method = "GET",
  data,
}: {
  url: string;
  method: RequestMethod;
  data: any;
}) {
  /**
   * 保证调接口之前处于登录状态
   * token过期，自动登录并且重新调接口
   */
  async function ensureToken() {
    let token = auth.token;
    if (token) {
      return token;
    }
    await loginLock.acquire();
    token = auth.token;
    if (token) {
      return token;
    }

    const code = await getLoginCode();

    const res = await fetch({
      url: getRequestUrl("/user/login_by_mini_program"),
      header: makeAuthHeader(),
      method: "POST",
      data: {
        code,
        ...(getLaunchInfo() || {}),
      },
    });
    const newToken = res.token;
    auth.setToken(newToken);
    const user = res.user;
    auth.setUser(user);
    loginLock.release();
    return newToken;
  }

  async function callApi(token: string): Promise<any> {
    try {
      return await fetch({
        url: getRequestUrl(url),
        header: makeAuthHeader(token),
        data,
        method,
      });
    } catch (error: any) {
      console.log("错误：");
      console.log(error);
      if (
        error.code === ErrorCode.TOKEN_EXPIRED ||
        error.status === ErrorCode.TOKEN_EXPIRED
      ) {
        auth.clearAuth();
        return await callApi(await ensureToken());
      } else {
        throw error;
      }
    }
  }

  const token = await ensureToken();
  return await callApi(token);
}

export async function request({ url, method = "GET", data }: TBaseRequest) {
  return loginRequiredRequest({
    url,
    method,
    data,
  });
}

export function get(url: string, data?: any) {
  return request({
    url,
    data: data || {},
  });
}

export function post(url: string, data?: any) {
  return request({
    url,
    method: "POST",
    data: data || {},
  });
}
