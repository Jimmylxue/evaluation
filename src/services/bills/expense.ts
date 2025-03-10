import { ClientError } from "@/api/ApiProvider";
import { post } from "@/api/client";
import {
  UndefinedInitialDataOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { BillsType } from ".";

export type TExpenseType = {
  id: number;
  name: string;
  cover: string;
  description: string;
  createdTime: string;
  updateTime: string;
};

export function useExpenseTypeList(
  config?: Omit<
    UndefinedInitialDataOptions<TExpenseType[], ClientError>,
    "queryFn"
  > & { params?: {} }
) {
  return useQuery<TExpenseType[], ClientError>({
    ...config,
    queryFn: () => post("/bill_system/expense_type/list"),
    queryKey: config!.queryKey,
  });
}

export type TExpense = {
  id: string;
  price: number;
  cover: string;
  description: string;
  type: TExpenseType;
  createdTime: string;
  updateTime: string;
  use_time: string;
  billsType: BillsType;
};

type TExpenseResponse = {
  result: TExpense[];
  total: number;
  page: number;
};

export const useCurrentExpense = (
  config?: Omit<
    UndefinedInitialDataOptions<TExpenseResponse, ClientError>,
    "queryFn"
  > & {
    params: {
      page: number;
      pageSize: number;
      startTime: string;
      endTime: string;
    };
  }
) => {
  return useQuery<TExpenseResponse, ClientError>({
    ...config,
    queryFn: () => post("/bill_system/expense/list", config?.params),
    queryKey: config!.queryKey,
  });
};

type TAddExpense = {
  price: number;
  cover?: string;
  description?: string;
  typeId: number;
  use_time: string;
};

export const useAddExpense = (
  config?: UseMutationOptions<any, ClientError, TAddExpense>
) => {
  return useMutation<any, ClientError, TAddExpense>({
    mutationFn: async (data) => {
      const response: any = await post("/bill_system/expense/add", data);
      return response;
    },
    ...config,
  });
};
