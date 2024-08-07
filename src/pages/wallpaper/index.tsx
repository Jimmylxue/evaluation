import { View, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import {
  previewImage,
  downloadFile,
  showToast,
  saveImageToPhotosAlbum,
} from "@tarojs/taro";
import { useBingBg } from "@/services/bingBg";
import { Loading } from "@/components/Loading";
import { memo } from "react";

const Children = () => {
  const { data, isLoading } = useBingBg({
    queryKey: ["bingBg"],
    params: {},
  });
  return (
    <View className="index px-2 pb-2">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data?.images?.map((item, index) => (
            <View key={index} className="mb-2">
              <View className="mb-1 font-sans font-semibold">{item.title}</View>
              <View className="relative">
                <AtIcon
                  className="absolute right-2 top-2"
                  value="download-cloud"
                  size="30"
                  color="#ecf0f1"
                  onClick={() => {
                    downloadFile({
                      url: `https://cn.bing.com/${item.url}`,
                      success: (link) => {
                        saveImageToPhotosAlbum({
                          filePath: link.tempFilePath,
                          success: () => {
                            showToast({
                              title: "下载成功",
                              icon: "success",
                              duration: 2000,
                            });
                          },
                        });
                      },
                    });
                  }}
                ></AtIcon>
                <Image
                  onClick={() => {
                    previewImage({
                      current: `https://cn.bing.com/${item.url}`, // 当前显示图片的http链接
                      urls: [`https://cn.bing.com/${item.url}`], // 需要预览的图片http链接列表
                    });
                  }}
                  className="rounded-lg w-full"
                  src={`https://cn.bing.com/${item.url}`}
                />
              </View>
              <View className=" text-justify text-gray-500 text-xs">
                {item.copyright}
              </View>
            </View>
          ))}
        </>
      )}
    </View>
  );
};

export default memo(function Index() {
  return <Children />;
});
