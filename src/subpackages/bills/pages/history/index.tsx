import "./index.scss";
import { View, Text, Picker, Image } from "@tarojs/components";
import { useState } from "react";
import { useMonthBillHistory } from "@/services/bills/history";
import { getMonthDate } from "@/utils/time";
import { BillsType } from "@/services/bills";
import { TrendChart } from "./components/TrendChart";

// Mock 数据

export default function Index() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const { data } = useMonthBillHistory({
    params: {
      startTime: getMonthDate(currentDate).startTime,
      endTime: getMonthDate(currentDate).endTime,
    },
    queryKey: ["monthBillHistory", currentDate],
  });

  // 处理月份选择
  const handleDateChange = (e) => {
    const [year, month] = e.detail.value.split("-");
    setCurrentDate(new Date(parseInt(year), parseInt(month) - 1));
  };

  // 获取当前日期字符串，格式：YYYY-MM
  const getCurrentDateString = () => {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  };

  return (
    <View className="min-h-screen bg-gray-50 px-4 bg-gradient">
      <View className="flex items-center mb-5 pt-4">
        <Picker
          mode="date"
          fields="month"
          value={getCurrentDateString()}
          onChange={handleDateChange}
        >
          <View className="flex items-center">
            <Text className="text-base mr-1">
              {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
            </Text>
            <Text className="text-xs mr-4">▼</Text>
          </View>
        </Picker>
      </View>

      <View className="bg-white flex justify-between items-center rounded-xl p-4 mb-4">
        <View className="flex items-center">
          <Text className="text-gray-500 text-sm mr-3">月支出</Text>
          <Text className="text-base font-medium">
            ¥ {data?.totalExpense.toFixed(2)}
          </Text>
        </View>
        <View className="flex items-center justify-between">
          <View className="flex items-center">
            <Text className="text-gray-500 text-sm mr-3">月收入</Text>
            <Text className="text-base font-medium">
              ¥ {data?.totalIncome.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <TrendChart
        currentDate={currentDate}
        dailyDetailMap={data?.dailyDetailMap}
      />

      <View className="flex justify-between mb-4 mt-4">
        <Text className="text-sm text-gray-500">
          月结余：¥ {data?.monthBalance.toFixed(2)}
        </Text>
        <Text className="text-sm text-gray-500">
          日均支出：¥ {data?.dailyExpensePrice.toFixed(2)}
        </Text>
      </View>

      <View className="bg-white rounded-xl p-4">
        <View className="flex justify-between items-center mb-4">
          <Text className="font-medium">账单明细</Text>
          <Text className="text-sm text-gray-500">按时间</Text>
        </View>
        {Object.entries(data?.dailyDetailMap || {}).length > 0 ? (
          Object.entries(data?.dailyDetailMap || {}).map(([date, dayData]) => {
            return (
              <View key={date}>
                <View className="flex justify-between py-2">
                  <Text className="text-sm text-gray-500">{date}</Text>
                  <Text className="text-xs text-gray-400">
                    支:{dayData.expense.toFixed(2)} 收:
                    {dayData.income.toFixed(2)}
                  </Text>
                </View>
                {dayData.list.map((bill, index) => (
                  <View
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
                  >
                    <View className="flex items-center">
                      <Image
                        src={bill.type.cover}
                        className=" size-6 mr-3"
                      ></Image>
                      <View>
                        <Text className="text-xs text-gray-700">
                          {bill.type.name}
                        </Text>
                      </View>
                    </View>
                    <Text
                      className={`text-base font-medium ${
                        bill.billsType === BillsType.收入
                          ? "text-teal-400"
                          : "text-red-400"
                      }`}
                    >
                      {bill.billsType === BillsType.支出 ? "-" : "+"}
                      {bill.price.toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>
            );
          })
        ) : (
          <View className="py-12 flex flex-col items-center">
            <Image
              src={"https://image.jimmyxuexue.top/img/emoji_u1f423.png"}
              className="w-32 h-32 mb-4 opacity-50"
            />
            <Text className="text-gray-400 text-sm">本月还没有记账哦～</Text>
          </View>
        )}
      </View>
    </View>
  );
}
