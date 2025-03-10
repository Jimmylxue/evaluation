import "./index.scss";
import { View, Text, Picker } from "@tarojs/components";
import { useState } from "react";

interface BillItem {
  id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  description?: string;
  icon?: string;
}

interface DayData {
  date: string;
  income: number;
  expense: number;
  bills: BillItem[];
}

interface TrendPoint {
  day: number;
  expense: number;
}

// Mock 数据
const mockMonthData: Record<string, DayData> = {
  "2025-03-05": {
    date: "2025-03-05",
    income: 0,
    expense: 35,
    bills: [
      {
        id: "1",
        amount: 35,
        type: "expense",
        category: "交通",
        date: "2025-03-05",
        icon: "🚗",
      },
    ],
  },
  "2025-03-10": {
    date: "2025-03-10",
    income: 0,
    expense: 20,
    bills: [
      {
        id: "2",
        amount: 20,
        type: "expense",
        category: "餐饮",
        date: "2025-03-10",
        icon: "🍽️",
      },
    ],
  },
  "2025-03-15": {
    date: "2025-03-15",
    income: 1000,
    expense: 150,
    bills: [
      {
        id: "3",
        amount: 150,
        type: "expense",
        category: "购物",
        date: "2025-03-15",
        icon: "🛍️",
      },
      {
        id: "4",
        amount: 1000,
        type: "income",
        category: "工资",
        date: "2025-03-15",
        icon: "💰",
      },
    ],
  },
  "2025-03-20": {
    date: "2025-03-20",
    income: 0,
    expense: 80,
    bills: [
      {
        id: "5",
        amount: 80,
        type: "expense",
        category: "娱乐",
        date: "2025-03-20",
        icon: "🎮",
      },
    ],
  },
  "2025-03-25": {
    date: "2025-03-25",
    income: 200,
    expense: 45,
    bills: [
      {
        id: "6",
        amount: 45,
        type: "expense",
        category: "日用",
        date: "2025-03-25",
        icon: "🏠",
      },
      {
        id: "7",
        amount: 200,
        type: "income",
        category: "兼职",
        date: "2025-03-25",
        icon: "💼",
      },
    ],
  },
};

export default function Index() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 10));
  const [monthData] = useState<Record<string, DayData>>(mockMonthData);

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

  // 获取月份的关键日期标记
  const getMonthKeyDates = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    return [
      `${currentDate.getMonth() + 1}月1日`,
      `${Math.ceil(daysInMonth * 0.25)}日`,
      `${Math.ceil(daysInMonth * 0.5)}日`,
      `${Math.ceil(daysInMonth * 0.75)}日`,
      `${daysInMonth}日`,
    ];
  };

  // 计算月度总收支
  const calculateMonthTotal = () => {
    let totalIncome = 0;
    let totalExpense = 0;
    Object.values(monthData).forEach((day) => {
      totalIncome += day.income;
      totalExpense += day.expense;
    });
    return { totalIncome, totalExpense };
  };

  // 计算日均支出
  const calculateDailyAverage = () => {
    const { totalExpense } = calculateMonthTotal();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    return totalExpense / daysInMonth;
  };

  // 生成趋势图数据点
  const generateTrendPoints = (): TrendPoint[] => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const points: TrendPoint[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      // 格式化日期字符串为 YYYY-MM-DD
      const dateStr = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      const dayData = monthData[dateStr];
      points.push({
        day: i,
        expense: dayData?.expense || 0,
      });
    }

    return points;
  };

  const { totalIncome, totalExpense } = calculateMonthTotal();
  const dailyAverage = calculateDailyAverage();
  const trendPoints = generateTrendPoints();

  const getMaxExpense = (points: TrendPoint[]): number => {
    const max = Math.max(...points.map((p) => p.expense));
    return max === 0 ? 100 : max;
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
        <View className="flex items-center mb-2">
          <Text className="text-gray-500 text-sm mr-3">月支出</Text>
          <Text className="text-base font-medium">
            ¥ {totalExpense.toFixed(2)}
          </Text>
        </View>
        <View className="flex items-center justify-between">
          <View className="flex items-center">
            <Text className="text-gray-500 text-sm mr-3">月收入</Text>
            <Text className="text-base font-medium">
              ¥ {totalIncome.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <View className="trend-chart-container">
        <View className="trend-chart-grid">
          {[...Array(5)].map((_, i) => (
            <View
              key={i}
              className="border-t border-gray-100"
              style={{ height: "20%" }}
            />
          ))}
        </View>

        <View className="trend-chart-bars">
          {trendPoints.map((point, index) => {
            const maxExpense = getMaxExpense(trendPoints);
            const height = (point.expense / maxExpense) * 100;

            return (
              <View key={index} className="trend-chart-bar-wrapper">
                <View
                  className="trend-chart-bar"
                  style={
                    {
                      height: `${height}%`,
                      "--primary-color": "#F87171",
                      "--primary-light-color": "#FCA5A5",
                    } as any
                  }
                >
                  <View className="trend-chart-bar-tooltip">
                    ¥{point.expense.toFixed(2)}
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View className="flex justify-between text-xs text-gray-400 mt-2">
          {getMonthKeyDates().map((date, index) => (
            <Text key={index}>{date}</Text>
          ))}
        </View>
      </View>

      <View className="flex justify-between mb-4">
        <Text className="text-sm text-gray-500">
          月结余：¥ {(totalIncome - totalExpense).toFixed(2)}
        </Text>
        <Text className="text-sm text-gray-500">
          日均支出：¥ {dailyAverage.toFixed(2)}
        </Text>
      </View>

      <View className="bg-white rounded-xl p-4">
        <View className="flex justify-between items-center mb-4">
          <Text className="font-medium">账单明细</Text>
          <Text className="text-sm text-gray-500">按时间</Text>
        </View>
        {Object.entries(monthData).map(([date, dayData]) => (
          <View key={date}>
            <View className="flex justify-between py-2">
              <Text className="text-sm text-gray-500">3月10日 今天</Text>
              <Text className="text-xs text-gray-400">
                支:{dayData.expense.toFixed(2)} 收:{dayData.income.toFixed(2)}
              </Text>
            </View>
            {dayData.bills.map((bill) => (
              <View
                key={bill.id}
                className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
              >
                <View className="flex items-center">
                  <Text className="text-2xl mr-3">{bill.icon}</Text>
                  <View>
                    <Text className="text-[15px] text-gray-700">
                      {bill.category}
                    </Text>
                  </View>
                </View>
                <Text
                  className={`text-base font-medium ${
                    bill.type === "income" ? "text-teal-400" : "text-red-400"
                  }`}
                >
                  {bill.type === "expense" ? "-" : "+"}
                  {bill.amount.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
