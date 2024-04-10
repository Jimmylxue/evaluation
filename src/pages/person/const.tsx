import { switchTab } from "@/core/route";
import { ButtonProps } from "@tarojs/components";

export const FunctionList = [
  {
    name: "帮助中心",
    icon: "help",
  },
  {
    name: "分享小程序",
    icon: "share",
    openType: "share",
  },
  {
    name: "开源代码",
    icon: "streaming",
  },
  {
    name: "支持一下",
    icon: "money",
  },
  {
    name: "壁纸大全",
    icon: "file-png",
    action: () => {
      switchTab("/pages/wallpaper/index");
    },
  },
] as {
  name: string;
  icon: string;
  openType?: ButtonProps.OpenType;
  action?: () => void;
}[];
