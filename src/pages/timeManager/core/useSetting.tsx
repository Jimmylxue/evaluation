import { Input, Picker, Text, View } from "@tarojs/components";
import { useEffect, useState } from "react";
import {
  AtButton,
  AtFab,
  AtFloatLayout,
  AtList,
  AtListItem,
  AtNoticebar,
} from "taro-ui";
import { resetTimeList, useUserConfig } from "./useUserConfig";
import { cloneDeep } from "lodash-es";
import { bigThan, smallThan } from "@/utils/time";
import { showToast } from "@/utils/notice";

export function useSetting() {
  const [showSetting, setShowSetting] = useState<boolean>(false);

  const { salary, salaryDay, afternoonTime, resetTime, workTime, updateAll } =
    useUserConfig();

  const [_salary, setSalary] = useState(() => salary);
  const [_salaryDay, setSalaryDay] = useState(() => salaryDay);
  const [_afternoonTime, setAfternoonTime] = useState(() => afternoonTime);
  const [_resetTime, setResetTime] = useState(() => resetTime);
  const [_workTime, setWorkTime] = useState(() => workTime);

  useEffect(() => {
    setSalary(salary);
  }, [salary]);

  useEffect(() => {
    setSalaryDay(salaryDay);
  }, [salaryDay]);

  useEffect(() => {
    setAfternoonTime(afternoonTime);
  }, [afternoonTime]);

  useEffect(() => {
    setWorkTime(workTime);
  }, [workTime]);

  useEffect(() => {
    setResetTime(resetTime);
  }, [resetTime]);

  const node = (
    <>
      <View className=" fixed right-2 bottom-24">
        <AtFab
          onClick={() => {
            setShowSetting(true);
          }}
        >
          <Text className="at-fab__icon at-icon at-icon-menu"></Text>
        </AtFab>
      </View>

      <AtFloatLayout
        isOpened={showSetting}
        // isOpened={true}
        onClose={() => {
          setShowSetting(false);
        }}
      >
        <AtNoticebar>数据本地存储，保护您的隐私安全</AtNoticebar>

        <View className=" flex justify-between items-center border-b py-4 border-b-[#f7f7f7]">
          <View>每月收入</View>
          <Input
            value={String(_salary)}
            className=" text-right text-[#888888]"
            placeholder="请输入您的收入"
            onInput={(e) => {
              setSalary(e.detail.value as any);
            }}
          />
        </View>

        <View className=" flex justify-between items-center py-4 border-b border-b-[#f7f7f7]">
          <View>发薪日期</View>
          <View>
            <Picker
              mode="selector"
              range={new Array(30).fill("_").map((_, index) => index + 1)}
              onChange={(e) => {
                const value = e.detail.value;
                console.log("value", e.detail.value);
                setSalaryDay(Number(value) + 1);
              }}
              value={_salaryDay - 1}
            >
              <AtList>
                <AtListItem
                  title={
                    <View className=" text-[#888888]">
                      {_salaryDay ? _salaryDay + "号" : "请选择"}
                    </View>
                  }
                />
              </AtList>
            </Picker>
          </View>
        </View>

        <View className=" flex justify-between items-center py-4 border-b border-b-[#f7f7f7]">
          <View>上班时间</View>
          <View className=" flex justify-center items-center">
            <Picker
              mode="time"
              onChange={(e) => {
                const value = e.detail.value;
                if (smallThan(value, _workTime?.[1])) {
                  const newArr = cloneDeep(_workTime) as any;
                  newArr[0] = value;
                  setWorkTime(newArr);
                } else {
                  showToast({
                    icon: "none",
                    title: "开始时间不能大于结束时间",
                  });
                }
              }}
              value={_workTime?.[0]!}
            >
              <AtList>
                <AtListItem
                  title={
                    <View className=" text-[#888888]">
                      {_workTime?.[0] ? _workTime?.[0] : "请选择"}
                    </View>
                  }
                />
              </AtList>
            </Picker>
            <View className="mx-2">-</View>
            <Picker
              mode="time"
              onChange={(e) => {
                const value = e.detail.value;
                if (bigThan(value, _workTime?.[0])) {
                  const newArr = cloneDeep(_workTime) as any;
                  newArr[1] = value;
                  setWorkTime(newArr);
                } else {
                  showToast({
                    icon: "none",
                    title: "结束时间不能小于开始时间",
                  });
                }
              }}
              value={_workTime?.[1]!}
            >
              <AtList>
                <AtListItem
                  title={
                    <View className=" text-[#888888]">
                      {_workTime?.[1] ? _workTime?.[1] : "请选择"}
                    </View>
                  }
                />
              </AtList>
            </Picker>
          </View>
        </View>

        <View className=" flex justify-between items-center py-4 border-b border-b-[#f7f7f7]">
          <View>午休时间</View>
          <View className=" flex justify-center items-center">
            <Picker
              mode="time"
              onChange={(e) => {
                const value = e.detail.value;
                console.log(
                  "check",
                  value,
                  _afternoonTime?.[1],
                  smallThan(value, _afternoonTime?.[1])
                );
                if (smallThan(value, _afternoonTime?.[1])) {
                  const newArr = cloneDeep(_afternoonTime) as any;
                  newArr[0] = value;
                  setAfternoonTime(newArr);
                } else {
                  showToast({
                    icon: "none",
                    title: "开始时间不能大于结束时间",
                  });
                }
              }}
              value={_afternoonTime?.[0]!}
            >
              <AtList>
                <AtListItem
                  title={
                    <View className=" text-[#888888]">
                      {_afternoonTime?.[0] ? _afternoonTime?.[0] : "请选择"}
                    </View>
                  }
                />
              </AtList>
            </Picker>
            <View className="mx-2">-</View>
            <Picker
              mode="time"
              value={_afternoonTime?.[1]!}
              onChange={(e) => {
                const value = e.detail.value;
                if (bigThan(value, _afternoonTime?.[0])) {
                  const newArr = cloneDeep(_afternoonTime) as any;
                  newArr[1] = value;
                  setAfternoonTime(newArr);
                } else {
                  showToast({
                    icon: "none",
                    title: "结束时间不能小于开始时间",
                  });
                }
              }}
            >
              <AtList>
                <AtListItem
                  title={
                    <View className=" text-[#888888]">
                      {_afternoonTime?.[1] ? _afternoonTime?.[1] : "请选择"}
                    </View>
                  }
                />
              </AtList>
            </Picker>
          </View>
        </View>

        <View className=" flex justify-between items-center py-4 border-b border-b-[#f7f7f7]">
          <View>休息时间</View>
          <View>
            <Picker
              mode="selector"
              range={["周末双休", "周六一天", "周日一天"]}
              onChange={(e) => {
                const value = e.detail.value;
                console.log("value", e.detail.value);
                setResetTime(value as any);
              }}
              value={_resetTime}
            >
              <AtList>
                <AtListItem
                  title={
                    <View className=" text-[#888888]">
                      {resetTimeList?.[_resetTime] || "请选择"}
                    </View>
                  }
                />
              </AtList>
            </Picker>
          </View>
        </View>

        <AtButton
          type="primary"
          onClick={() => {
            updateAll?.({
              newWorkTime: _workTime!,
              newAfternoonTime: _afternoonTime!,
              newSalary: _salary,
              newResetTime: _resetTime,
              newSalaryDay: _salaryDay,
            });
            setShowSetting(false);
          }}
        >
          保存
        </AtButton>
      </AtFloatLayout>
    </>
  );

  return { node };
}
