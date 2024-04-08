import { useBingBg } from "@/services/login";
import { View, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { observer } from "mobx-react-lite";
import {
  previewImage,
  downloadFile,
  showToast,
  saveImageToPhotosAlbum,
} from "@tarojs/taro";
import { locationInfo } from "@/store/location";

locationInfo.updateLocation();
export default observer(function Index() {
  const { data } = useBingBg(["bingBg"], {});

  return (
    <View className="index">
      {locationInfo?.address?.formatted_address}
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
    </View>
  );
});
