import { useCurrentExpense } from "@/services/bills/expense";
import { useCurrentIncome } from "@/services/bills/income";
import { getThreeDayDate } from "@/utils/time";
/**
 * 获取 近3天 支出 、 收入 集合数据
 */
export const useThreeDayBillData = () => {
  const { data: expenseData, refetch: refetchExpense } = useCurrentExpense({
    queryKey: ["expenseThreeDays"],
    params: {
      page: 1,
      pageSize: 30,
      startTime: getThreeDayDate().startTime,
      endTime: getThreeDayDate().endTime,
    },
  });
  const { data: incomeData, refetch: refetchIncome } = useCurrentIncome({
    queryKey: ["incomeThreeDays"],
    params: {
      page: 1,
      pageSize: 30,
      startTime: getThreeDayDate().startTime,
      endTime: getThreeDayDate().endTime,
    },
  });

  const threeDayBills = [
    ...(expenseData?.result || []),
    ...(incomeData?.result || []),
  ].sort((a, b) => {
    return new Date(b.use_time).getTime() - new Date(a.use_time).getTime();
  });

  const refetch = () => {
    refetchExpense();
    refetchIncome();
  };

  return {
    threeDayBills,
    refetch,
  };
};
