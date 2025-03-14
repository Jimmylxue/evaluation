export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/wallpaper/index",
    "pages/person/index",
    "pages/register/index",
    "pages/timeManager/index",
  ],
  subPackages: [
    {
      root: "subpackages/luckDraw",
      pages: ["pages/index/index"],
    },
    {
      root: "subpackages/games",
      pages: ["pages/bird/index", "pages/crazyTree/index"],
    },
    {
      root: "subpackages/emoticon",
      pages: ["pages/index/index"],
    },
    {
      root: "subpackages/bills",
      pages: [
        "pages/index/index",
        "pages/bookkeeping/index",
        "pages/history/index",
      ],
    },
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  /**
   * icon 默认色： #acacad
   * icon 选中色： #6b8fe1
   */
  tabBar: {
    color: "#7A7E83",
    selectedColor: "#6b8fe1",
    backgroundColor: "#FFF",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/icon/home-default.png",
        selectedIconPath: "./assets/icon/home-selected.png",
      },
      // {
      //   pagePath: "pages/wallpaper/index",
      //   text: "图库",
      //   iconPath: "./assets/icon/pic-default.png",
      //   selectedIconPath: "./assets/icon/pic-selected.png",
      // },
      {
        pagePath: "pages/person/index",
        text: "个人中心",
        iconPath: "./assets/icon/person-default.png",
        selectedIconPath: "./assets/icon/person-selected.png",
      },
    ],
  },
  requiredPrivateInfos: ["getLocation", "chooseLocation"],
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于小程序位置接口的效果展示",
    },
  },
});
