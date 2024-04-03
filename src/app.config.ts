export default defineAppConfig({
  pages: ["pages/index/index", "pages/person/index"],
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
      {
        pagePath: "pages/person/index",
        text: "个人中心",
        iconPath: "./assets/icon/person-default.png",
        selectedIconPath: "./assets/icon/person-selected.png",
      },
    ],
  },
});
