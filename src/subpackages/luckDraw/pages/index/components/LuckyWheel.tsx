import { useEffect, useRef, useState } from "react";
import { LuckyWheel } from "@lucky-canvas/taro/react";
import { DrinkList } from "../const";
import { Image, Text, View } from "@tarojs/components";
import { showToast } from "@/utils/notice";
import { AtButton, AtFab, AtFloatLayout } from "taro-ui";
import classnames from "classnames";
import { cloneDeep } from "lodash-es";
import { useUserSelect } from "../core/useUserSelect";

export function LuckyWheelNode() {
  const myLucky = useRef<any>();
  const [showSetting, setShowSetting] = useState<boolean>(false);
  const { selectDrink, updateSelectDrink } = useUserSelect();
  const [_selectDrink, setSelectDrink] = useState<number[]>([]);
  const [prizes, setPrizes] = useState<any[]>([]);

  useEffect(() => {
    setSelectDrink(selectDrink);
  }, [selectDrink]);

  useEffect(() => {
    const _drinkList = DrinkList.filter((drink) =>
      selectDrink.includes(drink.id)
    );
    setPrizes(
      _drinkList.map((drink, index) => ({
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
  }, [selectDrink]);
  return (
    <View className=" mt-4 relative">
      <View className=" text-lg font-semibold">
        下午茶时光，犒赏自己一杯好茶！
      </View>
      <View className=" text-gray-600 text-sm mb-4">
        放慢脚步，享受片刻宁静，打工人也值得这一份甜蜜时光！
      </View>
      {!showSetting && (
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
              icon: "none",
              title: `就决定是你了！${prize.name}`,
            });
          }}
        />
      )}

      <AtFab
        size="small"
        className=" absolute right-2  top-14"
        onClick={() => {
          setShowSetting(true);
        }}
      >
        <Text className="at-fab__icon at-icon at-icon-menu"></Text>
      </AtFab>

      <AtFloatLayout
        isOpened={showSetting}
        title="选择品牌"
        onClose={() => {
          setShowSetting(false);
        }}
      >
        <View className=" flex flex-wrap justify-between gap-2 mb-2">
          {DrinkList.map((item, index) => (
            <View
              key={index}
              className={classnames(
                " flex items-center  w-[31%] shadow-md p-2",
                {
                  "bg-[#bcc5ea]": _selectDrink.includes(item.id),
                  "text-white": _selectDrink.includes(item.id),
                }
              )}
              onClick={() => {
                const tempSelectDrink = cloneDeep(_selectDrink);
                const index = tempSelectDrink.findIndex((id) => id === item.id);
                if (index !== -1) {
                  tempSelectDrink.splice(index, 1);
                } else {
                  tempSelectDrink.push(item.id);
                }
                setSelectDrink(tempSelectDrink);
              }}
            >
              <Image className=" size-[60rpx]" src={item.imgSrc} />
              <Text className=" ml-2 text-sm">{item.name}</Text>
            </View>
          ))}
          <View
            className={classnames(" flex items-center  w-[31%] shadow-md p-2")}
          ></View>
        </View>
        <AtButton
          className=" mt-2"
          type="primary"
          onClick={() => {
            updateSelectDrink?.(_selectDrink);
            setShowSetting(false);
          }}
        >
          保存
        </AtButton>
      </AtFloatLayout>
    </View>
  );
}
