import { navigate } from "@/core/route";
import { Image, View } from "@tarojs/components";
import { TActionItem } from "../const";

type TProps = {
  action: TActionItem;
  index: number;
};

export function ActionTab({ action, index }: TProps) {
  return (
    <View
      className={`
        bg-white rounded-lg w-full px-4 py-4 mb-3
        shadow-sm hover:shadow
        transform hover:translate-x-1
        transition-all duration-300 ease-out
        animate-slideIn
        flex justify-between items-center
      `}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      onClick={() => {
        navigate(action.url);
      }}
    >
      <View className="flex-1">
        <View className="text-lg font-bold text-gray-800 mb-1">
          {action.name}
        </View>
        <View className="text-gray-500 text-sm">{action.desc}</View>
      </View>
      <View className="ml-4 transform hover:scale-105 transition-transform duration-300">
        <Image className="size-[100rpx]" src={action.icon} mode="aspectFill" />
      </View>
    </View>
  );
}
