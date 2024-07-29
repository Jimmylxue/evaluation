import { Image, Text, View } from "@tarojs/components";
import { AtCountdown, AtProgress } from "taro-ui";
import { useYearJobData } from "../core/useYearJobData";

export function YearJob() {
  const { yearMakeMoney, yearProgress, receiveYearSalaryMsg } =
    useYearJobData();
  return (
    <View className=" mb-2 shadow-lg px-2 py-4 bg-white flex ">
      <Image
        src="https://image.jimmyxuexue.top/img/%E8%BF%87%E5%B9%B44-copy-copy.png"
        className=" size-[60rpx] flex-shrink-0"
      />
      <View className=" w-full ml-2">
        <View className=" text-lg font-semibold text-[#333] flex items-center">
          距离过年{" "}
          <AtCountdown
            className=" ml-2"
            isCard
            isShowDay
            day={receiveYearSalaryMsg?.days}
            minutes={receiveYearSalaryMsg?.minutes}
            seconds={receiveYearSalaryMsg?.seconds}
          />
        </View>
        <View className=" my-2">
          <AtProgress
            percent={yearProgress}
            status={yearProgress === 100 ? "success" : "progress"}
            isHidePercent
            color="#81a3ee"
          />
        </View>
        <View className="text-gray-600 text-sm">
          今年已收米：
          <Text className=" font-semibold text-black text-base">
            ¥{yearMakeMoney}
          </Text>
        </View>
      </View>
    </View>
  );
}
