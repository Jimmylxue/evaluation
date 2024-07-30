import { View } from "@tarojs/components";
import { observer } from "mobx-react-lite";
import { LuckyWheelNode } from "./components/LuckyWheel";
import { SlotMachineNode } from "./components/SlotMachine";

export default observer(function Index() {
  return (
    <View className="index h-full px-2 bg-[#e9e8fa] pt-4">
      <SlotMachineNode />
      <LuckyWheelNode />
    </View>
  );
});
