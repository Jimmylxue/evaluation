import { get } from "@/api/client";
import { ClientError } from "@/api/react-query";
import { QueryKey, UseQueryOptions, useQuery } from "react-query";

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

export function useBingBg(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TBingImageList, ClientError>
) {
  return useQuery<TBingImageList, ClientError>(
    queryKey,
    () => get("/bingBg/weekList", variable),
    config
  );
}
