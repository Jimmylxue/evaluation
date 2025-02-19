import { View, Input, Button, Image } from "@tarojs/components";
import { useState } from "react";
import Taro from "@tarojs/taro";
import StarryBackground from "@/components/StarryBackground";
import { useGenerateEmoticon } from "@/services/emoticon";

export default function Index() {
  const [mainText, setMainText] = useState("");
  const [subText, setSubText] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");

  const { mutate: generateEmoticon, isPending: isLoading } =
    useGenerateEmoticon({
      onSuccess(data) {
        setGeneratedImage(data[0]);
      },
    });

  // 处理主文本输入
  const handleMainTextInput = (e) => {
    setMainText(e.detail.value);
  };

  // 处理副文本输入
  const handleSubTextInput = (e) => {
    setSubText(e.detail.value);
  };

  // 生成表情包
  const handleGenerate = async () => {
    if (!mainText.trim()) {
      Taro.showToast({
        title: "请输入主要文字",
        icon: "none",
      });
      return;
    }
    await generateEmoticon({
      prompt: `${mainText.trim()} ${subText.trim()}`,
    });
  };

  // 保存图片
  const handleSaveImage = async () => {
    if (!generatedImage) return;

    try {
      await Taro.saveImageToPhotosAlbum({
        filePath: generatedImage,
      });

      Taro.showToast({
        title: "保存成功",
        icon: "success",
      });
    } catch (error) {
      Taro.showToast({
        title: "保存失败，请重试",
        icon: "none",
      });
    }
  };

  return (
    <View className="relative min-h-screen">
      <StarryBackground />

      {/* 主容器 */}
      <View className="relative px-4 py-6 z-10">
        {/* 标题区域 */}
        <View className="text-center mb-6 animate-fadeIn">
          <View className="text-2xl font-bold text-white">表情包生成器</View>
          <View className="text-sm text-white/80 mt-2">
            输入文字，生成专属表情包
          </View>
        </View>

        {/* 预览区域 - 移到上面 */}
        <View className="mb-6 space-y-4">
          {/* 预览图片位置提示 */}
          {!generatedImage && (
            <View className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center text-white/60 border-2 border-dashed border-white/20 animate-glow">
              生成的表情包将在这里显示
            </View>
          )}

          {/* 生成的图片 */}
          {generatedImage && (
            <View className="bg-white/10 backdrop-blur-md rounded-2xl p-5 animate-fadeIn">
              <View className="text-white text-lg mb-4 text-center font-medium">
                预览
              </View>
              <Image
                src={generatedImage}
                className="w-full rounded-xl shadow-lg"
                mode="widthFix"
              />
              <Button
                className="mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl py-2 transform hover:scale-105 transition-all duration-300 shadow-lg"
                onClick={handleSaveImage}
              >
                保存到相册
              </Button>
            </View>
          )}
        </View>

        {/* 输入区域 */}
        <View className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-xl animate-slideUp">
          <View className="space-y-5">
            {/* 主要文字输入 */}
            <View className="space-y-2">
              <View className="text-white/60 text-sm font-medium px-1 mb-2">
                主要文字
              </View>
              <Input
                className="block bg-white/10 rounded-xl px-5 py-3 h-12 text-white placeholder:text-white/40 border border-white/10 focus:border-white/20 transition-colors duration-300"
                type="text"
                placeholder="请输入要生成的文字"
                value={mainText}
                onInput={handleMainTextInput}
              />
            </View>

            {/* 配文输入 */}
            <View className="space-y-2">
              <View className="text-white/60 text-sm font-medium px-1 mb-2">
                配文（可选）
              </View>
              <Input
                className="block bg-white/10 rounded-xl px-5 py-3 text-white placeholder:text-white/40 border border-white/10 focus:border-white/20 transition-colors duration-300"
                type="text"
                placeholder="请输入配文"
                value={subText}
                onInput={handleSubTextInput}
              />
            </View>
          </View>

          <Button
            className={`mt-8 w-full rounded-xl py-3 font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
              isLoading
                ? "bg-gray-400/50 text-white/70"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-xl"
            }`}
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? "生成中..." : "生成表情包"}
          </Button>
        </View>

        {/* 底部提示 - 添加跳动动画 */}
        <View className="mt-6 text-center">
          <View className="inline-block text-white/70 text-sm animate-bounce">
            👆 点击右上角分享给好友
          </View>
        </View>
      </View>
    </View>
  );
}
