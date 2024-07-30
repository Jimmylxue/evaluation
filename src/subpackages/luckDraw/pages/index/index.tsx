import { View } from "@tarojs/components";
import { observer } from "mobx-react-lite";
import { LuckyWheelNode } from "./components/LuckyWheel";
import { SlotMachineNode } from "./components/SlotMachine";
import { UserSelectContextProvider } from "./core/useUserSelect";

export default observer(function Index() {
  return (
    <UserSelectContextProvider>
      <View className="index h-full px-2 bg-[#e9e8fa] pt-4">
        <SlotMachineNode />
        <LuckyWheelNode />
      </View>
    </UserSelectContextProvider>
  );
});
