import Taro from "@tarojs/taro";

const LOCATION_SCOPE = "scope.userLocation";

async function checkAuth(
  callback: () => void,
  fail: () => void,
  hasGuide?: boolean
) {
  Taro.getSetting({
    success: (auth) => {
      console.log({ auth });
      if (process.env.TARO_ENV === "weapp") {
        /** 没有授权过 */
        const noAuthLocation =
          auth?.authSetting?.["scope.userLocation"] === undefined;
        /** 已经同意授权 */
        const hasAuthLocation = !!auth?.authSetting?.["scope.userLocation"];
        /** 拒绝授权 */
        const refuseAuthLocation =
          auth?.authSetting?.["scope.userLocation"] !== undefined &&
          !auth?.authSetting?.["scope.userLocation"];
        if (noAuthLocation) {
          // 如果没有授权过，则出位置授权弹窗
          Taro.authorize({
            scope: LOCATION_SCOPE,
            success() {
              // 用户已经同意小程序使用位置功能，后续调用 Taro.getLocation 接口不会弹窗询问
              callback();
            },
            fail() {
              fail();
            },
          });
        }
        if (hasAuthLocation) {
          // 如果已经授权过 则不需要做特殊处理
          callback();
        }
        if (refuseAuthLocation) {
          // 希望引导至设置页面开启或关闭位置权限
          if (hasGuide) {
            Taro.openSetting({
              success: async function (res: any) {
                if (res?.authSetting?.location) {
                  callback();
                }
              },
            });
          } else {
            fail();
          }
        }
      }
    },
    fail: () => {
      Taro.showModal({
        title: "授权",
        content: "请在系统设置中将位置权限打开",
      });
      fail();
    },
  });
}

/**
 * 获取位置信息
 */
export function getLocation(
  fulfilled: (res: any) => void,
  rejected: () => void,
  hasGuide?: boolean // 授权记录中查到用户拒绝后，是否进行引导
) {
  return new Promise<Taro.getLocation.SuccessCallbackResult>(
    (resolve, reject) => {
      const get = () => {
        Taro.getLocation({
          type: "gcj02",
          // isHighAccuracy: true,
          success(res) {
            resolve(res);
          },
          fail(res) {
            reject(res);
          },
        });
      };
      checkAuth(get, reject, hasGuide);
    }
  ).then(fulfilled, rejected);
}

/**
 * 根据经纬度 - 打开地图
 */
export function openLocation(params: Taro.openLocation.Option) {
  Taro.openLocation({
    ...params,
  });
}
