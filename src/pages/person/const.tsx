import { showToast } from "@/utils/notice";
import { ButtonProps } from "@tarojs/components";
import { setClipboardData, scanCode, navigateTo } from "@tarojs/taro";

export const FunctionList = [
  {
    name: "分享小程序",
    icon: "share",
    openType: "share",
  },
  {
    name: "开源代码",
    icon: "streaming",
    action: () => {
      setClipboardData({
        data: "https://github.com/Jimmylxue/evaluation.git",
        success: () => {
          showToast({
            icon: "none",
            title: "项目地址已复制",
          });
        },
      });
    },
  },
  {
    name: "扫一扫",
    icon: "camera",
    action: async () => {
      const res = await scanCode({});
      console.log("res", res);
      try {
        const scanResult = JSON.parse(res.result);
        if (scanResult.type === "login") {
          const { qr_id, token } = scanResult;
          navigateTo({
            url: `/subpackages/scanAuth/pages/index/index?qr_id=${qr_id}&token=${token}`,
          });
        }
      } catch (error) {
        showToast({ title: "请扫描正确二维码", icon: "none" });
      }
    },
  },
  // {
  //   name: "支持一下",
  //   icon: "money",
  //   action: () => {
  //     zanShang.setZanShangImg(
  //       "https://image.jimmyxuexue.top/upload/1722324549712zanshang.jpg"
  //     );
  //     zanShang.setZanShang(true);
  //   },
  // },
] as {
  name: string;
  icon: string;
  openType?: ButtonProps.OpenType;
  action?: () => void;
}[];
