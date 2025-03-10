import { uploadFile } from "@/services/common/file";
import { Input, Picker, Text, View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { AtIcon } from "taro-ui";

type TProps = {
  showKeyboard: boolean;
  onConfirm: (params: {
    amount: string;
    remark: string;
    date: string;
    image?: string;
  }) => void;
};

export default function NumberKeyboard({ showKeyboard, onConfirm }: TProps) {
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // 默认今天
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  // 格式化金额显示
  const formatAmount = (value: string) => {
    if (!value) return "0.00";

    // 处理只有小数点的情况
    if (value === ".") return "0.";

    // 分割整数和小数部分
    const [integer, decimal] = value.split(".");

    // 处理整数部分，添加千分位
    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // 如果有小数部分，确保只显示两位
    if (decimal !== undefined) {
      return `${formattedInteger}.${decimal.slice(0, 2)}`;
    }

    return formattedInteger;
  };

  // 处理键盘输入
  const handleKeyPress = (key: string) => {
    if (key === "删除") {
      setAmount((prev) => prev.slice(0, -1));
      return;
    }
    setAmount((prev) => {
      // 如果是第一个字符
      if (!prev) {
        // 不允许第一位输入小数点
        if (key === ".") return "0.";
        // 不允许第一位输入多个0
        if (key === "0" || key === "00") return "0";
        return key;
      }

      // 处理小数点
      if (key === ".") {
        // 如果已经有小数点，则忽略
        if (prev.includes(".")) return prev;
        return prev + ".";
      }

      // 处理数字输入
      const [integer, decimal] = prev.split(".");

      // 如果有小数部分
      if (decimal !== undefined) {
        // 如果小数部分已经有两位，则忽略新输入
        if (decimal.length >= 2) return prev;
        return prev + key;
      }

      // 处理整数部分
      // 如果第一位是0，且当前要输入的不是小数点
      if (integer === "0" && key !== ".") {
        return key;
      }

      // 处理00键
      if (key === "00") {
        if (integer === "0") return prev;
        return prev + "00";
      }

      return prev + key;
    });
  };

  // 添加触摸处理函数
  const handleTouchStart = (key: string) => {
    setActiveKey(key);
  };

  const handleTouchEnd = () => {
    setActiveKey(null);
  };

  const confirmFn = () => {
    if (amount === "") {
      Taro.showToast({
        title: "请输入金额",
        icon: "none",
      });
      return;
    }
    onConfirm({ amount, remark, date, image: imageUrl });
  };

  return (
    <View
      className={`fixed bottom-0 left-0 right-0 bg-white transition-transform z-20 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] ${
        showKeyboard ? "transform" : "translate-y-full"
      }`}
    >
      <View className="p-4">
        <View className="flex items-center mb-4">
          <Text className="text-[#666] mr-1">¥</Text>
          <Text className="text-2xl">{formatAmount(amount)}</Text>
        </View>

        <View className="flex items-center gap-2 mb-2">
          <Input
            className="flex-1 text-sm text-[#333]"
            placeholder="请输入备注信息（最多150字）"
            placeholderClass="text-[#999]"
            value={remark}
            onInput={(e) => setRemark(e.detail.value)}
            maxlength={150}
          />
          <Picker
            mode="date"
            value={date}
            onChange={(e) => setDate(e.detail.value)}
          >
            <View className="text-sm text-[#333] bg-gray-100 px-2 py-1 rounded">
              {date}
            </View>
          </Picker>
          <View
            className="flex items-center justify-center relative"
            onClick={() => {
              if (!imageUrl) {
                Taro.chooseImage({
                  count: 1,
                  sizeType: ["compressed"],
                  sourceType: ["album", "camera"],
                  success: async function (res) {
                    try {
                      const result = await uploadFile(res.tempFilePaths[0]);
                      const data = JSON.parse(result as string);
                      setImageUrl(data.result);
                    } catch (error) {
                      Taro.showToast({
                        title: "上传失败",
                        icon: "none",
                      });
                    }
                  },
                });
              }
            }}
          >
            {imageUrl ? (
              <View className="relative">
                <Image
                  src={imageUrl}
                  className="w-6 h-6 rounded object-cover"
                  mode="aspectFill"
                />
                <View
                  className="absolute -top-2 -right-2 w-4 h-4 bg-gray-500 rounded-full flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageUrl("");
                  }}
                >
                  <View className="text-white text-xs">×</View>
                </View>
              </View>
            ) : (
              <AtIcon value="file-jpg" size="24" color="#000"></AtIcon>
            )}
          </View>
        </View>
      </View>

      <View className="grid grid-cols-4 gap-2 p-4">
        <View
          className={`flex justify-center items-center h-12 rounded ${
            activeKey === "1" ? "bg-gray-300" : "bg-gray-200"
          }`}
          onClick={() => handleKeyPress("1")}
          onTouchMove={() => handleTouchEnd()}
          onTouchCancel={() => handleTouchEnd()}
          onTouchStart={() => handleTouchStart("1")}
          onTouchEnd={() => handleTouchEnd()}
        >
          1
        </View>
        <View
          className={`flex justify-center items-center h-12 rounded ${
            activeKey === "2" ? "bg-gray-300" : "bg-gray-200"
          }`}
          onClick={() => handleKeyPress("2")}
          onTouchMove={() => handleTouchEnd()}
          onTouchCancel={() => handleTouchEnd()}
          onTouchStart={() => handleTouchStart("2")}
          onTouchEnd={() => handleTouchEnd()}
        >
          2
        </View>
        <View
          className={`flex justify-center items-center h-12 rounded ${
            activeKey === "3" ? "bg-gray-300" : "bg-gray-200"
          }`}
          onClick={() => handleKeyPress("3")}
          onTouchMove={() => handleTouchEnd()}
          onTouchCancel={() => handleTouchEnd()}
          onTouchStart={() => handleTouchStart("3")}
          onTouchEnd={() => handleTouchEnd()}
        >
          3
        </View>

        <View
          className={`flex justify-center items-center h-full rounded row-span-2 ${
            activeKey === "删除" ? "bg-gray-300" : "bg-gray-200"
          }`}
          onClick={() => handleKeyPress("删除")}
          onTouchMove={() => handleTouchEnd()}
          onTouchCancel={() => handleTouchEnd()}
          onTouchStart={() => handleTouchStart("删除")}
          onTouchEnd={() => handleTouchEnd()}
        >
          <AtIcon value="chevron-left" size="30" color="#000"></AtIcon>
        </View>

        <View
          className={`flex justify-center items-center h-12 rounded ${
            activeKey === "4" ? "bg-gray-300" : "bg-gray-200"
          }`}
          onClick={() => handleKeyPress("4")}
          onTouchMove={() => handleTouchEnd()}
          onTouchCancel={() => handleTouchEnd()}
          onTouchStart={() => handleTouchStart("4")}
          onTouchEnd={() => handleTouchEnd()}
        >
          4
        </View>
        <View
          className={`flex justify-center items-center h-12 rounded ${
            activeKey === "5" ? "bg-gray-300" : "bg-gray-200"
          }`}
          onClick={() => handleKeyPress("5")}
          onTouchMove={() => handleTouchEnd()}
          onTouchCancel={() => handleTouchEnd()}
          onTouchStart={() => handleTouchStart("5")}
          onTouchEnd={() => handleTouchEnd()}
        >
          5
        </View>
        <View
          className={`flex justify-center items-center h-12 rounded ${
            activeKey === "6" ? "bg-gray-300" : "bg-gray-200"
          }`}
          onClick={() => handleKeyPress("6")}
          onTouchMove={() => handleTouchEnd()}
          onTouchCancel={() => handleTouchEnd()}
          onTouchStart={() => handleTouchStart("6")}
          onTouchEnd={() => handleTouchEnd()}
        >
          6
        </View>

        <View
          className={`flex justify-center items-center h-12 rounded ${
            activeKey === "7" ? "bg-gray-300" : "bg-gray-200"
          }`}
          onClick={() => handleKeyPress("7")}
          onTouchMove={() => handleTouchEnd()}
          onTouchCancel={() => handleTouchEnd()}
          onTouchStart={() => handleTouchStart("7")}
          onTouchEnd={() => handleTouchEnd()}
        >
          7
        </View>
        <View
          className={`flex justify-center items-center h-12 rounded ${
            activeKey === "8" ? "bg-gray-300" : "bg-gray-200"
          }`}
          onClick={() => handleKeyPress("8")}
          onTouchMove={() => handleTouchEnd()}
          onTouchCancel={() => handleTouchEnd()}
          onTouchStart={() => handleTouchStart("8")}
          onTouchEnd={() => handleTouchEnd()}
        >
          8
        </View>
        <View
          className={`flex justify-center items-center h-12 rounded ${
            activeKey === "9" ? "bg-gray-300" : "bg-gray-200"
          }`}
          onClick={() => handleKeyPress("9")}
          onTouchMove={() => handleTouchEnd()}
          onTouchCancel={() => handleTouchEnd()}
          onTouchStart={() => handleTouchStart("9")}
          onTouchEnd={() => handleTouchEnd()}
        >
          9
        </View>

        <View
          className={`flex justify-center items-center h-full text-white rounded row-span-2 ${
            activeKey === "完成" ? "bg-blue-600" : "bg-blue-500"
          }`}
          onClick={confirmFn}
          onTouchMove={() => handleTouchEnd()}
          onTouchCancel={() => handleTouchEnd()}
          onTouchStart={() => handleTouchStart("完成")}
          onTouchEnd={() => handleTouchEnd()}
        >
          完成
        </View>

        <View
          className={`flex justify-center items-center h-12 rounded ${
            activeKey === "00" ? "bg-gray-300" : "bg-gray-200"
          }`}
          onClick={() => handleKeyPress("00")}
          onTouchMove={() => handleTouchEnd()}
          onTouchCancel={() => handleTouchEnd()}
          onTouchStart={() => handleTouchStart("00")}
          onTouchEnd={() => handleTouchEnd()}
        >
          00
        </View>
        <View
          className={`flex justify-center items-center h-12 rounded ${
            activeKey === "0" ? "bg-gray-300" : "bg-gray-200"
          }`}
          onClick={() => handleKeyPress("0")}
          onTouchMove={() => handleTouchEnd()}
          onTouchCancel={() => handleTouchEnd()}
          onTouchStart={() => handleTouchStart("0")}
          onTouchEnd={() => handleTouchEnd()}
        >
          0
        </View>
        <View
          className={`flex justify-center items-center h-12 rounded ${
            activeKey === "." ? "bg-gray-300" : "bg-gray-200"
          }`}
          onClick={() => handleKeyPress(".")}
          onTouchMove={() => handleTouchEnd()}
          onTouchCancel={() => handleTouchEnd()}
          onTouchStart={() => handleTouchStart(".")}
          onTouchEnd={() => handleTouchEnd()}
        >
          .
        </View>
      </View>
    </View>
  );
}
