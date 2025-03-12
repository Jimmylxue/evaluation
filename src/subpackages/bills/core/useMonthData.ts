import { useCurrentExpense } from "@/services/bills/expense";
import { useCurrentIncome } from "@/services/bills/income";
import { getMonthDate } from "@/utils/time";

/**
 * 获取 近一个月 支出 、 收入 集合数据
 */
export const useMonthBillData = () => {
  const { startTime, endTime } = getMonthDate();

  const { data: expenseData, refetch: refetchExpense } = useCurrentExpense({
    queryKey: ["expenseMonth"],
    params: {
      page: 1,
      pageSize: 100, // 增加页面大小以确保能获取到所有数据
      startTime,
      endTime,
    },
  });

  const { data: incomeData, refetch: refetchIncome } = useCurrentIncome({
    queryKey: ["incomeMonth"],
    params: {
      page: 1,
      pageSize: 100, // 增加页面大小以确保能获取到所有数据
      startTime, // 添加时间范围过滤
      endTime, // 添加时间范围过滤
    },
  });

  const monthExpensePrice =
    (expenseData?.result || []).reduce((acc, curr) => acc + curr.price, 0) || 0;
  const monthIncomePrice =
    (incomeData?.result || []).reduce((acc, curr) => acc + curr.price, 0) || 0;

  const refetch = () => {
    refetchExpense();
    refetchIncome();
  };

  return {
    monthExpensePrice,
    monthIncomePrice,
    refetch,
  };
};
