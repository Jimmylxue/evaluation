import { View } from "@tarojs/components";
import { observer } from "mobx-react-lite";
import { ActionTab } from "./components/ActionTab";
import { actionList } from "./const";
import { AtNoticebar } from "taro-ui";

export default observer(function Index() {
  return (
    <View className="index min-h-screen bg-[#faf9fd] pt-2">
      <AtNoticebar className="mb-3">工作换取报酬，摸鱼才是挣钱💰~</AtNoticebar>
      <View className="px-3">
        {actionList.map((action, index) => (
          <ActionTab key={index} action={action} index={index} />
        ))}
      </View>
    </View>
  );
});
