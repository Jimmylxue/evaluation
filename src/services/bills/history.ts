import { ClientError } from "@/api/ApiProvider";
import { post } from "@/api/client";
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { TExpense } from "./expense";
import { TIncome } from "./income";

export type TMonthBillHistoryResponse = {
  totalIncome: number;
  totalExpense: number;
  dailyExpensePrice: number;
  monthBalance: number;
  incomeList: number;
  expenseList: number;
  dailyDetailMap: {
    [key in string]: {
      list: (TExpense | TIncome)[];
      income: number;
      expense: number;
      balance: number;
    };
  };
};

export const useMonthBillHistory = (
  config?: Omit<
    UndefinedInitialDataOptions<TMonthBillHistoryResponse, ClientError>,
    "queryFn"
  > & {
    params?: {
      startTime: string;
      endTime: string;
    };
  }
) => {
  return useQuery<TMonthBillHistoryResponse, ClientError>({
    ...config,
    queryFn: () => post("/bill_system/history/month_record", config?.params),
    queryKey: config!.queryKey,
  });
};
