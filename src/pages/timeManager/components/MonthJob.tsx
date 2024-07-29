import { Image, Text, View } from "@tarojs/components";
import { AtCountdown, AtProgress } from "taro-ui";
import { useMonthJobData } from "../core/useMonthJobData";

export function MonthJob() {
  const { monthMakeMoney, monthSalaryDayProgress, receiveMonthSalaryMsg } =
    useMonthJobData();

  return (
    <View className=" mb-2 shadow-lg px-2 py-4 bg-white flex ">
      <Image
        src="https://image.jimmyxuexue.top/img/%E6%9C%89%E8%80%83%E5%8B%A4%E6%9C%AA%E5%8F%91%E8%96%AA%E9%A1%B9%E7%9B%AE.png"
        className=" size-[60rpx] flex-shrink-0"
      />
      <View className=" w-full ml-2">
        <View className=" text-lg font-semibold text-[#333] flex items-center">
          距离发薪{" "}
          <AtCountdown
            className=" ml-2"
            isCard
            isShowDay
            hours={receiveMonthSalaryMsg?.hours}
            minutes={receiveMonthSalaryMsg?.minutes}
            day={receiveMonthSalaryMsg?.days}
            seconds={receiveMonthSalaryMsg?.seconds}
          />
        </View>
        <View className=" my-2">
          <AtProgress
            percent={monthSalaryDayProgress}
            status={monthSalaryDayProgress === 100 ? "success" : "progress"}
            isHidePercent
            color="#81a3ee"
          />
        </View>
        <View className="text-gray-600 text-sm">
          本月已收米：
          <Text className=" font-semibold text-black text-base">
            ¥{monthMakeMoney}
          </Text>
        </View>
      </View>
    </View>
  );
}
