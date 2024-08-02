import { Canvas, Image, View } from "@tarojs/components";
import { createCanvasContext, canvasToTempFilePath } from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import { Bird } from "./view/Bird";
import { getImgFromRemote } from "./utils";
import { SourceMap, updateTempImgFile } from "./const";
import { Display } from "./view/Display";
import { Loading } from "@/components/Loading";

export default function Index() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [gameStatus, setGameStatus] = useState<"pending" | "start" | "over">(
    "pending"
  );
  const score = useRef<number>(0);
  const ctx = createCanvasContext("myCanvas");
  const resultBg = useRef<string>("");

  const bird = useRef<Bird>();
  const display = useRef<Display>();

  /**
   * 创建小鸟
   */
  const createBird = () => {
    bird.current = new Bird(ctx);
  };

  /**
   * 创建舞台总进程
   */
  const createDisplay = () => {
    display.current = new Display(ctx, bird.current!);
    display.current.play((s) => {
      score.current = s;
      canvasToTempFilePath({
        canvasId: "myCanvas",
        success(result) {
          resultBg.current = result.tempFilePath;
          setGameStatus("over");
        },
      });
    });
  };

  const changeImageFromLocal = async (assets: Record<string, string>) => {
    const obj: any = {};
    for (const key in assets) {
      const tempUrl = await getImgFromRemote(assets[key] as string);
      obj[key] = tempUrl;
    }
    updateTempImgFile(obj);
  };

  useEffect(() => {
    (async () => {
      await changeImageFromLocal({
        ...SourceMap,
      }); // 将远程文件转为 canvas能用的 temp临时文件
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    // 初始化页面 获取页面页面的宽高 为了兼容不同尺寸
    if (gameStatus === "start") {
      createBird();
      createDisplay();
    }
  }, [gameStatus]);

  const clickRef = useRef<any>();

  return (
    <View>
      {loaded && (
        <>
          {gameStatus === "start" ? (
            <Canvas
              className="fixed"
              style={{
                width: `100vw`,
                height: `100vh`,
                display: "block",
              }}
              canvasId="myCanvas"
              onTap={() => {
                bird.current!.updateStatus("up");
                if (clickRef.current) {
                  clearTimeout(clickRef.current);
                }
                clickRef.current = setTimeout(() => {
                  bird.current!.updateStatus("down");
                }, 300);
              }}
            ></Canvas>
          ) : (
            <View className=" w-screen h-screen">
              <Image
                className=" w-full h-full"
                src={
                  gameStatus === "over"
                    ? resultBg.current
                    : "https://image.jimmyxuexue.top/img/image-20240802113034920.png"
                }
              />
              {gameStatus === "over" && (
                <View className=" bg-opacity-15 w-screen h-screen fixed z-10 flex justify-center items-center left-0 top-0">
                  <View className="w-[500rpx] flex flex-col p-4 items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl opacity-75">
                    <View className="">
                      <View className="text-center p-3 flex-auto justify-center">
                        <View className="text-xl font-bold py-4 text-gray-200">
                          游戏结束
                        </View>
                        <View className="text-sm text-gray-500 px-2">
                          您此次得分：{score.current || 0}
                        </View>
                      </View>
                      <View className="p-2 mt-2 text-center space-x-1 md:block">
                        <View
                          className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                          onClick={() => {
                            setGameStatus("pending");
                          }}
                        >
                          取消
                        </View>
                        <View
                          className="bg-green-400 hover:bg-green-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300"
                          onClick={() => {
                            setGameStatus("start");
                          }}
                        >
                          再来一次
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )}

              {gameStatus === "pending" && (
                <Image
                  onClick={() => {
                    setGameStatus("start");
                  }}
                  src="https://image.jimmyxuexue.top/img/20240802-135323-removebg-preview%20(1).png"
                  className=" absolute left-1/2 -translate-x-1/2 bottom-20 w-[220rpx] h-[100rpx] "
                />
              )}
            </View>
          )}
        </>
      )}

      {!loaded && <Loading />}
    </View>
  );
}
