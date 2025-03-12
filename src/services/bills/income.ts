import { ClientError } from "@/api/ApiProvider";
import { post } from "@/api/client";
import {
  UndefinedInitialDataOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { BillsType } from ".";

export type TIncomeType = {
  id: number;
  name: string;
  cover: string;
  description: string;
  createdTime: string;
  updateTime: string;
};

export function useIncomeTypeList(
  config?: Omit<
    UndefinedInitialDataOptions<TIncomeType[], ClientError>,
    "queryFn"
  > & { params?: {} }
) {
  return useQuery<TIncomeType[], ClientError>({
    ...config,
    queryFn: () => post("/bill_system/income_type/list"),
    queryKey: config!.queryKey,
  });
}

type TIncome = {
  id: string;
  price: number;
  cover: string;
  description: string;
  type: TIncomeType;
  createdTime: string;
  updateTime: string;
  use_time: string;
  billsType: BillsType;
};

type TIncomeResponse = {
  result: TIncome[];
  total: number;
  page: number;
};

export const useCurrentIncome = (
  config?: Omit<
    UndefinedInitialDataOptions<TIncomeResponse, ClientError>,
    "queryFn"
  > & { params?: {} }
) => {
  return useQuery<TIncomeResponse, ClientError>({
    ...config,
    queryFn: () => post("/bill_system/income/list", config?.params),
    queryKey: config!.queryKey,
  });
};

type TAddIncome = {
  price: number;
  cover?: string;
  description?: string;
  typeId: number;
  use_time: string;
};

export const useAddIncome = (
  config?: UseMutationOptions<any, ClientError, TAddIncome>
) => {
  return useMutation<any, ClientError, TAddIncome>({
    mutationFn: async (data) => {
      const response: any = await post("/bill_system/income/add", data);
      return response;
    },
    ...config,
  });
};
