import { TPage } from "@/core/route";

export type TActionItem = {
  name: string;
  desc: string;
  icon: string;
  url: TPage;
};

export const actionList = [
  {
    name: "时间管理大师",
    desc: "看看今天赚了多少米",
    icon: "https://image.jimmyxuexue.top/img/%E8%BF%98%E6%AC%BE_%E5%89%AF%E6%9C%AC.png",
    url: "/pages/timeManager/index",
  },
  {
    name: "精美壁纸",
    desc: "换个壁纸换个心情，用更好的心情来摸鱼",
    icon: "https://image.jimmyxuexue.top/img/%E4%B8%BB%E9%A2%98%E5%A3%81%E7%BA%B8.png",
    url: "/pages/wallpaper/index",
  },
  {
    name: "吃什么转盘",
    desc: "拒绝选择焦虑，忙碌中找到美味，给它一个机会",
    icon: "https://image.jimmyxuexue.top/img/%E5%A4%A7%E8%BD%AC%E7%9B%98.png",
    url: "/pages/luckDraw/index",
  },
] as TActionItem[];
