import { Image, View } from "@tarojs/components";
import { SlotMachine } from "@lucky-canvas/taro/react";
import { useRef, useState } from "react";
import { AtButton } from "taro-ui";
import { showToast } from "@/utils/notice";

export function SlotMachineNode() {
  const myLucky = useRef<any>();

  const luckIndex = useRef<number>(0);

  const [prizes] = useState([
    {
      background: "#bac5ee",
      borderRadius: "10px",
      name: "饭食",
      imgs: [
        {
          width: "60%",
          top: "20%",
          src: "https://image.jimmyxuexue.top/img/%E7%B1%B3%E9%A5%AD.png",
        },
      ],
    },
    {
      background: "#bac5ee",
      borderRadius: "10px",
      name: "面食",
      imgs: [
        {
          width: "60%",
          top: "20%",
          src: "https://image.jimmyxuexue.top/img/%E9%9D%A2%E6%9D%A1.png",
        },
      ],
    },
    {
      background: "#bac5ee",
      borderRadius: "10px",
      name: "汉堡",
      imgs: [
        {
          width: "60%",
          top: "20%",
          src: "https://image.jimmyxuexue.top/img/%E6%B1%89%E5%A0%A1.png",
        },
      ],
    },
  ]);

  return (
    <View className=" bg-[#e9e8fc] w-[700rpx] mx-auto ">
      <View className=" text-lg font-semibold">今天，你值得更好的主食！</View>
      <View className=" text-gray-600 text-sm">
        选择一份美味，打工人也要好好对待自己！
      </View>
      <View className="flex flex-col items-center mt-4">
        <SlotMachine
          ref={myLucky}
          width="700rpx"
          height="500rpx"
          blocks={[
            { padding: "10px", background: "#869cfa" },
            { padding: "10px", background: "#e9e8fe" },
          ]}
          prizes={prizes}
          slots={[
            { speed: 10, direction: 1, order: [0, 1, 2] },
            { speed: 15, direction: -1, order: [1, 2, 0] },
            { speed: 20, direction: 1, order: [2, 1, 0] },
          ]}
          defaultConfig={{
            rowSpacing: "10px",
            colSpacing: "10px",
          }}
          onStart={() => {
            // 点击抽奖按钮会触发star回调
            myLucky.current.play();
            setTimeout(() => {
              const index = (Math.random() * prizes.length) >> 0;
              luckIndex.current = index;
              myLucky.current.stop(index);
            }, 2500);
          }}
          onEnd={(prize) => {
            showToast({
              icon: "none",
              title: `就决定是你了！${prize.name}`,
            });
          }}
        />
        <View className=" w-[700rpx] mt-2">
          <AtButton
            type="primary"
            onClick={() => {
              myLucky.current.play();
              setTimeout(() => {
                const index = (Math.random() * prizes.length) >> 0;
                myLucky.current.stop(index);
              }, 2500);
            }}
          >
            <View className=" flex items-center">
              <Image
                className=" size-[60rpx]"
                src="https://image.jimmyxuexue.top/img/%E6%8A%BD%E5%A5%96ICON.png"
              />
              启动
            </View>
          </AtButton>
        </View>
      </View>
    </View>
  );
}
