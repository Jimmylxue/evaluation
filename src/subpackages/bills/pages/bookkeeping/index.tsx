import { View, Text, Image } from "@tarojs/components";
import "./index.scss";
import EmptyNavbar from "@/components/EmptyNavbar";
import { useRef, useState } from "react";
import { useNavBarHeight } from "@/core/system/navbar";
import NumberKeyboard from "@/components/NumberKeyboard";
import {
  TExpenseType,
  useExpenseTypeList,
  useAddExpense,
} from "@/services/bills/expense";
import {
  TIncomeType,
  useAddIncome,
  useIncomeTypeList,
} from "@/services/bills/income";
import Taro from "@tarojs/taro";
import { queryClient } from "@/api/ApiProvider";

export default function Index() {
  const [isExpense, setIsExpense] = useState(true);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const { height } = useNavBarHeight();

  const chooseType = useRef<TIncomeType | TExpenseType | null>(null);

  const { data: expenseTypeList } = useExpenseTypeList({
    queryKey: ["expenseTypeList"],
  });

  const { data: incomeTypeList } = useIncomeTypeList({
    queryKey: ["incomeTypeList"],
  });

  const { mutate: addIncome } = useAddIncome({
    onSuccess: () => {
      Taro.showToast({
        title: "添加成功",
        icon: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["expenseMonth"],
      });
      queryClient.invalidateQueries({
        queryKey: ["incomeMonth"],
      });
      queryClient.invalidateQueries({
        queryKey: ["expenseThreeDays"],
      });
      queryClient.invalidateQueries({
        queryKey: ["incomeThreeDays"],
      });
      setTimeout(() => {
        Taro.navigateBack();
      }, 500);
    },
  });

  const { mutate: addExpense } = useAddExpense({
    onSuccess: () => {
      Taro.showToast({
        title: "添加成功",
        icon: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["expenseMonth"],
      });
      queryClient.invalidateQueries({
        queryKey: ["incomeMonth"],
      });
      queryClient.invalidateQueries({
        queryKey: ["expenseThreeDays"],
      });
      queryClient.invalidateQueries({
        queryKey: ["incomeThreeDays"],
      });
      setTimeout(() => {
        Taro.navigateBack();
      }, 500);
    },
  });

  const typeList = isExpense ? expenseTypeList : incomeTypeList;

  // 修改处理点击背景的函数
  const handleBackgroundClick = () => {
    // 在微信小程序中，事件对象的结构不同
    setShowKeyboard(false);
  };

  // 修改分类点击处理函数
  const handleCategoryClick = (e) => {
    // 阻止事件冒泡
    e.stopPropagation?.();
    setShowKeyboard(true);
  };

  return (
    <View className="relative min-h-screen bg-light">
      <EmptyNavbar className="bg-gradient fixed top-0">
        <View className="flex justify-center items-center h-full">
          <View
            className="flex items-center flex-col justify-center relative h-full px-1 mx-2"
            onClick={() => {
              setIsExpense(true);
            }}
          >
            <Text
              className={`tracking-widest ${
                isExpense ? "text-active" : "text-inactive"
              }`}
            >
              支出
            </Text>
            <View
              className={`w-full bg-black absolute bottom-0 transition-transform duration-300 ${
                isExpense ? "translate-x-0" : "translate-x-full"
              }`}
              style={{
                height: 2,
              }}
            ></View>
          </View>
          <View
            className="flex items-center flex-col justify-center relative h-full px-1 mx-2"
            onClick={() => {
              setIsExpense(false);
            }}
          >
            <Text
              className={`tracking-widest ${
                !isExpense ? "text-active" : "text-inactive"
              }`}
            >
              收入
            </Text>
          </View>
        </View>
      </EmptyNavbar>

      {/* 添加一个遮罩层，只在键盘显示时可见和可点击 */}
      {showKeyboard && (
        <View className="fixed inset-0 z-10" onClick={handleBackgroundClick} />
      )}

      <View className="flex flex-wrap px-4 mt-8" style={{ paddingTop: height }}>
        {typeList?.map((expenseType, index) => (
          <View
            key={index}
            className="w-1/4 flex flex-col items-center mb-8"
            onClick={(e) => {
              chooseType.current = expenseType;
              handleCategoryClick(e);
            }}
          >
            <View className="size-10 bg-lime-100 rounded-full">
              <Image src={expenseType.cover} className="w-full h-full" />
            </View>
            <View className="mt-2 text-sm">{expenseType.name}</View>
          </View>
        ))}
      </View>

      <NumberKeyboard
        showKeyboard={showKeyboard}
        onConfirm={async (result) => {
          console.log(result);
          if (isExpense) {
            await addExpense({
              price: Number(result.amount),
              cover: result.image,
              description: result.remark,
              typeId: chooseType.current?.id!,
              use_time: result.date,
            });
          } else {
            await addIncome({
              price: Number(result.amount),
              cover: result.image,
              description: result.remark,
              typeId: chooseType.current?.id!,
              use_time: result.date,
            });
          }
        }}
      />
    </View>
  );
}
