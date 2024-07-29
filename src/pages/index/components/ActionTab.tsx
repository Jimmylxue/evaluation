import { navigate } from "@/core/route";
import { Image, View } from "@tarojs/components";
import { TActionItem } from "../const";

type TProps = {
  action: TActionItem;
};

export function ActionTab({ action }: TProps) {
  return (
    <View
      className=" bg-white rounded-md w-full px-2 py-4 mb-2 shadow-lg flex justify-between items-center"
      onClick={() => {
        navigate(action.url);
      }}
    >
      <View>
        <View className=" text-lg font-bold">{action.name}</View>
        <View className=" text-gray-700 text-sm ">{action.desc}</View>
      </View>
      <View>
        <Image className=" size-[100rpx]" src={action.icon} />
      </View>
    </View>
  );
}
