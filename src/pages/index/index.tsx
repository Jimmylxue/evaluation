import { View } from "@tarojs/components";
import { observer } from "mobx-react-lite";
import { locationInfo } from "@/store/location";
import { ActionTab } from "./components/ActionTab";
import { actionList } from "./const";
import { AtDivider, AtNoticebar } from "taro-ui";

locationInfo.updateLocation();

export default observer(function Index() {
  return (
    <View className="index h-screen bg-[#faf9fd] pt-2">
      <AtNoticebar className=" mb-2">工作换取报酬，摸鱼才是挣钱💰~</AtNoticebar>
      <View className=" flex flex-wrap justify-between items-center px-2 ">
        {actionList.map((action, index) => (
          <ActionTab key={index} action={action} />
        ))}
        <AtDivider content="敬请期待" />
      </View>
    </View>
  );
});
