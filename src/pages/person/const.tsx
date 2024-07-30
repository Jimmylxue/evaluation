import { showToast } from "@/utils/notice";
import { ButtonProps } from "@tarojs/components";
import { setClipboardData } from "@tarojs/taro";
import { zanShang } from "./core/zanshang";

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
    name: "支持一下",
    icon: "money",
    action: () => {
      zanShang.setZanShangImg(
        "https://image.jimmyxuexue.top/upload/1722324549712zanshang.jpg"
      );
      zanShang.setZanShang(true);
    },
  },
] as {
  name: string;
  icon: string;
  openType?: ButtonProps.OpenType;
  action?: () => void;
}[];
