import { View } from "@tarojs/components";
import { observer } from "mobx-react-lite";
import { AtNoticebar } from "taro-ui";
import { TodayJob } from "./components/TodayJob";
import { MonthJob } from "./components/MonthJob";
import { YearJob } from "./components/Yearjob";
// import { WeekJob } from "./components/WeekJob";

export default observer(function Index() {
  return (
    <View className="index h-screen px-2 bg-[#faf9fd]">
      <AtNoticebar className=" mb-2">
        只有摸鱼才是真正的赚钱💰~ 谁赞成，谁反对？
      </AtNoticebar>
      <TodayJob />
      {/* <WeekJob /> */}
      <MonthJob />
      <YearJob />
    </View>
  );
});
