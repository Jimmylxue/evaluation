import { View } from "@tarojs/components";
import { useNavBarHeight } from "@/core/system/navbar";
import { ReactNode } from "react";
import { AtIcon } from "taro-ui";
import { getCurrentPages, reLaunch, navigateBack } from "@tarojs/taro";
type TProps = {
  children?: ReactNode;
  className?: string;
  showBack?: boolean;
};

export default function EmptyNavbar({
  children,
  className,
  showBack = true,
}: TProps) {
  const { height, statusBarHeight } = useNavBarHeight();

  const enableBack = getCurrentPages().length > 1;

  return (
    <View className={` w-full  ${className}`} style={{ height }}>
      <View style={{ height: statusBarHeight }}></View>
      <View className=" relative" style={{ height: height - statusBarHeight }}>
        {showBack && (
          <AtIcon
            className="absolute top-1/2 left-2 -translate-y-1/2"
            value="chevron-left"
            size="30"
            color="#000"
            onClick={() => {
              if (enableBack) {
                navigateBack();
              } else {
                reLaunch({
                  url: "/pages/index/index",
                });
              }
            }}
          ></AtIcon>
        )}
        {children}
      </View>
    </View>
  );
}
