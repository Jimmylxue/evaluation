import { TMonthBillHistoryResponse } from "@/services/bills/history";
import { Text, View } from "@tarojs/components";

interface TrendPoint {
  day: number;
  expense: number;
}

type TProps = {
  currentDate: Date;
  dailyDetailMap?: TMonthBillHistoryResponse["dailyDetailMap"];
};

export const TrendChart = ({ currentDate, dailyDetailMap }: TProps) => {
  const getMaxExpense = (points: TrendPoint[]): number => {
    const max = Math.max(...points.map((p) => p.expense));
    return max === 0 ? 100 : max;
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
      const dayData = dailyDetailMap?.[dateStr];
      points.push({
        day: i,
        expense: dayData?.expense || 0,
      });
    }

    return points;
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

  const trendPoints = generateTrendPoints();

  return (
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
  );
};
