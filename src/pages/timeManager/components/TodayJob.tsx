import { Image, Text, View } from "@tarojs/components";
import { AtCountdown, AtProgress } from "taro-ui";
import { useTodayJobData } from "../core/useTodayJobData";

export function TodayJob() {
  const {
    afternoonRestProgress,
    afterRestMsg,
    offWorkProgress,
    offWorkMsg,
    todayMakeMoney,
  } = useTodayJobData();
  return (
    <>
      <View className=" mb-2 shadow-lg px-2 py-4 bg-white flex rounded ">
        <Image
          src="https://image.jimmyxuexue.top/img/%E5%8D%88%E4%BC%91%E6%A8%A1%E5%BC%8F.png"
          className=" size-[60rpx] flex-shrink-0"
        />
        <View className=" w-full ml-2">
          <View className=" text-lg font-semibold text-[#333] flex items-center">
            {afternoonRestProgress === 100 ? (
              <View>午休已结束</View>
            ) : (
              <View>
                距离午休{" "}
                <AtCountdown
                  className="ml-2"
                  isCard
                  hours={afterRestMsg?.hours}
                  minutes={afterRestMsg?.minutes}
                  seconds={afterRestMsg?.seconds}
                />
              </View>
            )}
          </View>
          <View className=" my-2">
            <AtProgress
              percent={afternoonRestProgress}
              status={afternoonRestProgress === 100 ? "success" : "progress"}
              isHidePercent
              color="#81a3ee"
            />
          </View>
          <View className="text-gray-600 text-sm">
            下午茶时光，犒赏自己一杯好茶！
          </View>
        </View>
      </View>
      <View className=" mb-2 shadow-lg px-2 py-4 bg-white flex ">
        <Image
          src="https://image.jimmyxuexue.top/img/%E4%B8%8B%E7%8F%AD.png"
          className=" size-[60rpx] flex-shrink-0"
        />
        <View className=" w-full ml-2">
          <View className=" text-lg font-semibold text-[#333] flex items-center">
            距离下班{" "}
            <AtCountdown
              className="ml-2"
              isCard
              hours={offWorkMsg?.hours}
              minutes={offWorkMsg?.minutes}
              seconds={offWorkMsg?.seconds}
            />
          </View>
          <View className=" my-2">
            <AtProgress
              percent={offWorkProgress}
              status={offWorkProgress === 100 ? "success" : "progress"}
              isHidePercent
              color="#81a3ee"
            />
          </View>
          <View className="text-gray-600 text-sm">
            今天已收米：
            <Text className=" font-semibold text-black text-base">
              ¥{todayMakeMoney}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
