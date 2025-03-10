import { View, Text, Image } from "@tarojs/components";
import { useState } from "react";
import { navigateTo } from "@tarojs/taro";
import "./index.scss";
import EmptyNavbar from "@/components/EmptyNavbar";
import { useThreeDayBillData } from "@/subpackages/bills/core/useThreeDayBillData";
import { formatTimeToDay } from "@/utils/time";
import classNames from "classnames";
import { BillsType } from "@/services/bills";
import { useMonthBillData } from "@/subpackages/bills/core/useMonthData";
import { showToast } from "@/utils/notice";
export default function Index() {
  const navigate = navigateTo;
  const [showAmount, setShowAmount] = useState(true);
  const [showAllBills, setShowAllBills] = useState(false);

  const { threeDayBills } = useThreeDayBillData();

  const { monthExpensePrice, monthIncomePrice } = useMonthBillData();

  const displayBills = showAllBills ? threeDayBills : threeDayBills.slice(0, 5);

  const handleAddRecord = () => {
    navigate({
      url: "/subpackages/bills/pages/bookkeeping/index",
    });
  };

  const toggleAmountVisibility = () => {
    setShowAmount((prev) => !prev);
  };

  const toggleShowAllBills = () => {
    setShowAllBills((prev) => !prev);
  };

  return (
    <View className="min-h-screen bg-[#f5f7f5] pb-6">
      <View className="bg-gradient-to-b from-[#dcedc1] to-[#f5f7f5] pb-6">
        <EmptyNavbar />

        {/* 月度概览 */}
        <View className="mx-4 mt-2">
          <Text className="text-gray-600 text-sm">鸭鸭账单</Text>
          <View className="flex items-center mt-2">
            <View className="flex-1">
              <Text className="text-gray-500 text-sm">本月支出(元)</Text>
              <View className="flex items-center mt-1">
                <Text className="text-3xl font-medium">
                  {showAmount ? monthExpensePrice.toFixed(2) : "****"}
                </Text>
                <View
                  className="ml-2 opacity-60 active:opacity-40 transition-opacity"
                  onClick={toggleAmountVisibility}
                >
                  <Text className="text-xl">{showAmount ? "👁️" : "👁️‍🗨️"}</Text>
                </View>
              </View>
            </View>
            <View className="text-right">
              <Text className="text-gray-500 text-sm">本月收入</Text>
              <Text className="block mt-1 text-lg">
                {showAmount ? monthIncomePrice.toFixed(2) : "****"}
              </Text>
            </View>
          </View>
        </View>

        {/* 记一笔按钮 */}
        <View className="mx-4 mt-6">
          <View
            className="bg-[#dcedc1] rounded-lg py-3 text-center add-record-btn"
            onClick={handleAddRecord}
          >
            <Text className="text-gray-700 font-medium">记一笔 ✍️</Text>
          </View>
        </View>
      </View>

      {/* 近期账单 */}
      <View className="mx-4 mt-4">
        <View className="flex justify-between items-center">
          <Text className="text-gray-600">近3日账单</Text>
        </View>

        {threeDayBills.length > 0 ? (
          <View className="mt-4">
            <View className="space-y-4 transition-all duration-300 ease-in-out">
              {displayBills.map((record, index) => (
                <View
                  key={index}
                  className="flex items-center justify-between active:opacity-60 transition-opacity animate-fadeIn"
                >
                  <View className="flex items-center">
                    <View className=" size-8 rounded-full overflow-hidden">
                      <Image
                        src={record?.type?.cover}
                        className="w-full h-full"
                      />
                    </View>

                    <View>
                      <Text className="text-gray-700 px-2">
                        {record.type.name}
                      </Text>
                      <View className="bg-gray-100 rounded px-2 py-0.5">
                        <Text className="text-gray-500 text-xs">
                          {formatTimeToDay(record.use_time)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text
                    className={classNames("", {
                      "text-[#eac54b]": record.billsType === BillsType.收入,
                      "text-red-500": record.billsType === BillsType.支出,
                    })}
                  >
                    ¥{showAmount ? record.price : "****"}
                  </Text>
                </View>
              ))}
            </View>

            {threeDayBills.length > 5 && (
              <View
                className="mt-6 flex items-center justify-center"
                onClick={toggleShowAllBills}
              >
                <View className="flex items-center px-4 py-2 rounded-full bg-[#dcedc1] active:opacity-70 transition-opacity">
                  <Text className="text-gray-600 text-sm mr-1">
                    {showAllBills ? "收起" : "查看更多"}
                  </Text>
                  <Text
                    className={`text-sm transition-transform duration-300 ${
                      showAllBills ? "rotate-180" : ""
                    }`}
                  >
                    ⌄
                  </Text>
                </View>
              </View>
            )}
          </View>
        ) : (
          <View className="flex flex-col items-center justify-center py-12">
            <Text className="text-4xl mb-3">🦆</Text>
            <Text className="text-gray-400 text-sm">
              还没有记账呢，快去记一笔吧～
            </Text>
          </View>
        )}
      </View>

      {/* 功能入口 */}
      <View className="mx-4 bg-white rounded-xl p-4 shadow-sm mt-10">
        <View className="grid grid-cols-3 gap-2">
          <View
            className="flex flex-col items-center py-2 active:opacity-60 transition-opacity"
            onClick={() => {
              showToast({
                title: "暂未开放",
                icon: "none",
              });
            }}
          >
            <View className="w-11 h-11 rounded-xl bg-[#f7f9f7] flex items-center justify-center mb-1">
              <Text className="text-2xl">📊</Text>
            </View>
            <Text className="text-sm text-gray-500">账单明细</Text>
          </View>

          <View
            className="flex flex-col items-center py-2 active:opacity-60 transition-opacity"
            onClick={() => {
              showToast({
                title: "暂未开放",
                icon: "none",
              });
            }}
          >
            <View className="w-11 h-11 rounded-xl bg-[#f7f9f7] flex items-center justify-center mb-1">
              <Text className="text-2xl">📈</Text>
            </View>
            <Text className="text-sm text-gray-500">统计报表</Text>
          </View>

          <View
            className="flex flex-col items-center py-2 active:opacity-60 transition-opacity"
            onClick={() => {
              showToast({
                title: "暂未开放",
                icon: "none",
              });
            }}
          >
            <View className="w-11 h-11 rounded-xl bg-[#f7f9f7] flex items-center justify-center mb-1">
              <Text className="text-2xl">⚙️</Text>
            </View>
            <Text className="text-sm text-gray-500">系统设置</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
