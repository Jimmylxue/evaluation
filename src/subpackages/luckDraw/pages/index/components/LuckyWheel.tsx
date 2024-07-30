import { useEffect, useRef, useState } from "react";
import { LuckyWheel } from "@lucky-canvas/taro/react";
import { DrinkList } from "../const";
import { View } from "@tarojs/components";
import { showToast } from "@/utils/notice";

export function LuckyWheelNode() {
  const myLucky = useRef<any>();
  const [prizes, setPrizes] = useState<any[]>([]);
  useEffect(() => {
    setPrizes(
      DrinkList.map((drink, index) => ({
        background: index % 2 === 0 ? "#e9e8fe" : "#b8c5f2",
        name: drink.name,
        imgs: [
          {
            src: drink.imgSrc,
            top: "10%",
            width: "100rpx",
            height: "100rpx",
          },
        ],
      }))
    );
  }, []);
  return (
    <View className=" mt-4">
      <View className=" text-lg font-semibold">
        下午茶时光，犒赏自己一杯好茶！
      </View>
      <View className=" text-gray-600 text-sm mb-4">
        放慢脚步，享受片刻宁静，打工人也值得这一份甜蜜时光！
      </View>
      <LuckyWheel
        ref={myLucky}
        width="300px"
        height="300px"
        blocks={[{ padding: "13px", background: "#617df2" }]}
        prizes={prizes}
        buttons={[
          { radius: "50px", background: "#617df2" },
          { radius: "45px", background: "#afc8ff" },
          {
            radius: "40px",
            background: "#869cfa",
            pointer: true,
            imgs: [
              {
                top: "-25px",
                src: "https://image.jimmyxuexue.top/img/%E6%8A%BD%E5%A5%96ICON.png",
                width: "100rpx",
                height: "100rpx",
              },
            ],
            // fonts: [{ text: "开始\n选择", top: "-20px" }],
          },
        ]}
        onStart={() => {
          // 点击抽奖按钮会触发star回调
          myLucky.current.play();
          setTimeout(() => {
            const index = (Math.random() * prizes.length) >> 0;
            myLucky.current.stop(index);
          }, 2500);
        }}
        onEnd={(prize) => {
          showToast({
            title: `就你吧！${prize.name}`,
          });
        }}
      />
    </View>
  );
}
