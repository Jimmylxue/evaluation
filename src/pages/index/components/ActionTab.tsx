import { navigate } from "@/core/route";
import { Image, Text, View } from "@tarojs/components";
import { TActionItem } from "../const";

type TProps = {
  action: TActionItem;
  index: number;
};

export function ActionTab({ action, index }: TProps) {
  return (
    <View
      className={`
        bg-white rounded-lg w-full p-2.5
        shadow-sm hover:shadow-md
        transform hover:-translate-y-0.5
        transition-all duration-200 ease-out
        animate-fadeIn
        flex items-center gap-2
      `}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      onClick={() => {
        navigate(action.url);
      }}
    >
      <Image
        className="w-[64rpx] h-[64rpx] rounded-lg"
        src={action.icon}
        mode="aspectFill"
      />
      <View className="flex-1 min-w-0">
        <Text className="text-sm font-medium text-gray-800 truncate">
          {action.name}
        </Text>
        <Text className="text-xs text-gray-500 mt-0.5 block truncate">
          {action.desc}
        </Text>
      </View>
    </View>
  );
}
