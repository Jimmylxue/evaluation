import { Text, View } from "@tarojs/components";
import { observer } from "mobx-react-lite";
import { ActionTab } from "./components/ActionTab";
import { actionCategories } from "./const";
import EmptyNavbar from "@/components/EmptyNavbar";

export default observer(function Index() {
  return (
    <View className="index min-h-screen bg-[#f5f5f5]">
      {/* 顶部欢迎语 - 改为更紧凑的设计 */}
      <View className="bg-gradient-to-r from-blue-500 to-purple-500 p-3">
        <EmptyNavbar showBack={false} />
        <Text className="text-white text-lg font-bold">
          今天也要开心摸鱼哦~ 🐟
        </Text>
        <Text className="text-white/80 text-xs mt-0.5 block">
          工作换取报酬，摸鱼才是挣钱
        </Text>
      </View>

      {/* 分类列表 - 改用网格布局 */}
      <View className="px-3 py-2">
        {actionCategories.map((category, categoryIndex) => (
          <View
            key={category.title}
            className="mb-4 animate-slideIn"
            style={{ animationDelay: `${categoryIndex * 0.2}s` }}
          >
            <View className="flex items-center mb-2">
              <Text className="text-base mr-1.5">{category.icon}</Text>
              <Text className="font-medium text-gray-700 text-sm">
                {category.title}
              </Text>
            </View>

            <View className="grid grid-cols-2 gap-2">
              {category.actions.map((action, index) => (
                <ActionTab key={action.name} action={action} index={index} />
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
});
