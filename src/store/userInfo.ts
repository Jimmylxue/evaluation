import Taro from "@tarojs/taro";
import { makeAutoObservable } from "mobx";
import { parseJson } from "../utils";

const AUTH_USER = "jimmy_mini_program_user";
const AUTH_TOKEN_NAME = "jimmy_mini_program_token";

enum ESex {
  男,
  女,
}

export type TUser = {
  avatar: string;
  createTime: string;
  id: number;
  mail?: string;
  phone?: string;
  sex: ESex;
  username: string;
};

export class Auth {
  private _user?: TUser;
  private _token?: string;
  constructor() {
    makeAutoObservable(this);
  }

  get token() {
    if (this._token) {
      return this._token;
    }
    this.setToken(Taro.getStorageSync(AUTH_TOKEN_NAME));
    return this._token;
  }

  setToken(token?: string) {
    this._token = token;
    Taro.setStorage({
      key: AUTH_TOKEN_NAME,
      data: token,
    });
  }

  get user() {
    if (this._user) {
      return this._user;
    }
    this.setUser(parseJson<TUser>(Taro.getStorageSync(AUTH_USER)));
    return this._user;
  }

  setUser(user?: TUser) {
    this._user = user;
    Taro.setStorage({
      key: AUTH_USER,
      data: user ? JSON.stringify(user) : "",
    });
  }

  get isLogin() {
    return !!this.token && !!this.user;
  }

  clearAuth() {
    this.setToken(undefined);
    Taro.removeStorageSync(AUTH_TOKEN_NAME);
    this.setUser(undefined);
    Taro.removeStorageSync(AUTH_USER);
  }
}

export const auth = new Auth();
