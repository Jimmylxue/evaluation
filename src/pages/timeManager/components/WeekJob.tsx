import { Image, View } from "@tarojs/components";
import { AtCountdown, AtProgress } from "taro-ui";
import { useWeekJobData } from "../core/useWeekJobData";
import { ECheckStatus } from "@/utils/time";

export function WeekJob() {
  const {
    weekStartMsg,
    weekEndMsg,
    nowWeekState,
    weekEndProgress,
    weekStartProgress,
  } = useWeekJobData();

  console.log("nowWeekState", nowWeekState);

  return (
    <View className=" mb-2 shadow-lg px-2 py-4 bg-white flex rounded ">
      <Image
        src={
          nowWeekState === ECheckStatus.小于开始时间
            ? "https://image.jimmyxuexue.top/img/1%E5%9B%BE%E6%A0%87-17.png"
            : "https://image.jimmyxuexue.top/img/%E5%B9%B2%E6%B4%BB.png"
        }
        className=" size-[60rpx] flex-shrink-0"
      />
      {nowWeekState === ECheckStatus.小于开始时间 && (
        <View className=" w-full ml-2">
          <View className=" text-lg font-semibold text-[#333] flex items-center">
            距离周末{" "}
            <AtCountdown
              className=" ml-2"
              isCard
              isShowDay
              hours={weekStartMsg?.hours}
              minutes={weekStartMsg?.minutes}
              day={weekStartMsg?.days}
              seconds={weekStartMsg?.seconds}
            />
          </View>
          <View className=" my-2">
            <AtProgress
              percent={weekStartProgress}
              status={weekStartProgress === 100 ? "success" : "progress"}
              isHidePercent
              color="#81a3ee"
            />
          </View>
          <View className="text-gray-600 text-sm">很快就可以躺平休息了</View>
        </View>
      )}
      {nowWeekState === ECheckStatus.处于两个时间内 && (
        <View className=" w-full ml-2">
          <View className=" text-lg font-semibold text-[#333] flex items-center">
            距离上班{" "}
            <AtCountdown
              className=" ml-2"
              isCard
              isShowDay
              hours={weekEndMsg?.hours}
              minutes={weekEndMsg?.minutes}
              day={weekEndMsg?.days}
              seconds={weekEndMsg?.seconds}
            />
          </View>
          <View className=" my-2">
            <AtProgress
              percent={weekEndProgress}
              status={weekEndProgress === 100 ? "success" : "progress"}
              isHidePercent
              color="#81a3ee"
            />
          </View>
          <View className="text-gray-600 text-sm">
            假期余额所剩不多了，疲惫上班
          </View>
        </View>
      )}
      {nowWeekState === ECheckStatus.大于结束时间 && (
        <View className=" w-full ml-2">
          <View className=" text-lg font-semibold text-[#333] flex items-center">
            距离开工{" "}
            <AtCountdown
              className=" ml-2"
              isCard
              isShowDay
              hours={weekEndMsg?.hours}
              minutes={weekEndMsg?.minutes}
              day={weekEndMsg?.days}
              seconds={weekEndMsg?.seconds}
            />
          </View>
          <View className=" my-2">
            <AtProgress
              percent={weekEndProgress}
              status={weekEndProgress === 100 ? "success" : "progress"}
              isHidePercent
              color="#81a3ee"
            />
          </View>
          <View className="text-gray-600 text-sm">
            假期余额所剩不多了，疲惫上班
          </View>
        </View>
      )}
    </View>
  );
}
