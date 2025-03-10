import { ClientError } from "@/api/ApiProvider";
import { post } from "@/api/client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useGenerateEmoticon = (
  config?: UseMutationOptions<
    string[],
    ClientError,
    {
      prompt: string;
      returnUrl: boolean;
    }
  >
) => {
  return useMutation<
    string[],
    ClientError,
    {
      prompt: string;
      returnUrl: boolean;
    }
  >({
    mutationFn: async (data) => {
      const response: any = await post("/doubao/process-image", data);
      return response;
    },
    ...config,
  });
};
