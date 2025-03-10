import { TPage } from "@/core/route";

export type TActionItem = {
  name: string;
  desc: string;
  icon: string;
  url: TPage;
};

export type TActionCategory = {
  title: string;
  icon: string;
  actions: TActionItem[];
};

export const actionCategories: TActionCategory[] = [
  {
    title: "常用工具",
    icon: "⭐️",
    actions: [
      {
        name: "时间管理大师",
        desc: "看看今天赚了多少米",
        icon: "https://image.jimmyxuexue.top/img/%E8%BF%98%E6%AC%BE_%E5%89%AF%E6%9C%AC.png",
        url: "/pages/timeManager/index",
      },
      {
        name: "鸭鸭账单",
        desc: "记录收支，管理财务",
        icon: "https://image.jimmyxuexue.top/img/%E7%BB%84%2010209.png",
        url: "/subpackages/bills/pages/index/index",
      },
    ],
  },
  {
    title: "生活助手",
    icon: "🛠️",
    actions: [
      {
        name: "吃什么转盘",
        desc: "告别选择困难",
        icon: "https://image.jimmyxuexue.top/img/%E5%A4%A7%E8%BD%AC%E7%9B%98.png",
        url: "/subpackages/luckDraw/pages/index/index",
      },
      // 预留位置添加更多生活类工具
    ],
  },
  {
    title: "休闲娱乐",
    icon: "🎮",
    actions: [
      {
        name: "像素鸟挑战",
        desc: "在繁忙工作间隙，挑战你的反应速度",
        icon: "https://image.jimmyxuexue.top/upload/17225012502830.png",
        url: "/subpackages/games/pages/bird/index",
      },
      {
        name: "疯狂伐木工",
        desc: "用伐木挑战来解压，让每个工人都能找到乐趣",
        icon: "https://image.jimmyxuexue.top/upload/1722659662149npc.png",
        url: "/subpackages/games/pages/crazyTree/index",
      },
    ],
  },
  {
    title: "创意工坊",
    icon: "🎨",
    actions: [
      {
        name: "鸭鸭表情包",
        desc: "生成专属表情包",
        icon: "https://image.jimmyxuexue.top/img/4.4%E5%84%BF%E7%AB%A5%E7%8E%A9%E5%85%B7.png",
        url: "/subpackages/emoticon/pages/index/index",
      },
      {
        name: "bing壁纸",
        desc: "每日精选壁纸",
        icon: "https://image.jimmyxuexue.top/img/%E4%B8%BB%E9%A2%98%E5%A3%81%E7%BA%B8.png",
        url: "/pages/wallpaper/index",
      },
    ],
  },
  // 可以继续添加新的分类
];
