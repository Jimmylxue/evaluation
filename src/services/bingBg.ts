import { ClientError } from "@/api/ApiProvider";
import { get } from "@/api/client";
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

type TBingImageItem = {
  startdate: string;
  fullstartdate: string;
  enddate: string;
  url: string;
  urlbase: string;
  copyright: string;
  copyrightlink: string;
  title: string;
  quiz: string;
  wp: boolean;
  hsh: string;
  drk: number;
  top: number;
  bot: number;
};

export type TBingImageList = {
  images: TBingImageItem[];
};

export const useBingBg = (
  config?: Omit<
    UndefinedInitialDataOptions<TBingImageList, ClientError>,
    "queryFn"
  > & { params?: {} }
) => {
  return useQuery<TBingImageList, ClientError>({
    ...config,
    queryFn: () => get("/bingBg/weekList", config?.params),
    queryKey: config!.queryKey,
  });
};
