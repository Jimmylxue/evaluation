import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";
import { observer } from "mobx-react-lite";
import { locationInfo } from "@/store/location";

locationInfo.updateLocation();
export default observer(function Index() {
  return (
    <View className="index">
      {locationInfo?.address?.formatted_address}
      <AtButton
        type="primary"
        onClick={() => {
          locationInfo.openNowLocationMap();
        }}
      >
        打开地图
      </AtButton>
    </View>
  );
});
