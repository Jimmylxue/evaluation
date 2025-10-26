import { post } from "@/api/client";
import { ClientError } from "@/api/ApiProvider";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useAuthScan = (
  config?: UseMutationOptions<
    boolean,
    ClientError,
    {
      qr_id: string;
    }
  >
) => {
  return useMutation<
    boolean,
    ClientError,
    {
      qr_id: string;
    }
  >({
    mutationFn: async (data) => {
      const response: any = await post("/scan_auth/scan", data);
      return response;
    },
    ...config,
  });
};

export const useAuthConfirm = (
  config?: UseMutationOptions<
    boolean,
    ClientError,
    {
      qr_id: string;
    }
  >
) => {
  return useMutation<
    boolean,
    ClientError,
    {
      qr_id: string;
    }
  >({
    mutationFn: async (data) => {
      const response: any = await post("/scan_auth/confirm", data);
      console.log("response", response);
      return response;
    },
    ...config,
  });
};
