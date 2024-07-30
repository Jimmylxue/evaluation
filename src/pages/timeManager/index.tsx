import { View } from "@tarojs/components";
import { AtNoticebar } from "taro-ui";
import { TodayJob } from "./components/TodayJob";
import { MonthJob } from "./components/MonthJob";
import { YearJob } from "./components/Yearjob";
import { WeekJob } from "./components/WeekJob";
import { useSetting } from "./core/useSetting";
import { UserConfigContextProvider } from "./core/useUserConfig";

const Children = () => {
  const { node } = useSetting();
  return (
    <View className="index h-screen bg-[#faf9fd]">
      <AtNoticebar className=" mb-2">
        只有摸鱼才是真正的赚钱💰~ 谁赞成，谁反对？
      </AtNoticebar>
      <View className=" w-full px-2">
        <TodayJob />
        <WeekJob />
        <MonthJob />
        <YearJob />
      </View>
      {node}
    </View>
  );
};

export default function Index() {
  return (
    <UserConfigContextProvider>
      <Children />
    </UserConfigContextProvider>
  );
}
