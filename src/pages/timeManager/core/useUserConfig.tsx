import { getStorageSync, setStorageSync } from "@tarojs/taro";
import { cloneDeep } from "lodash-es";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export enum EResetTime {
  周末双休,
  周六一天,
  周日一天,
}

export const resetTimeList = ["周末双休", "周六一天", "周日一天"];

type TUserConfig = {
  workTime?: [string, string];
  afternoonTime?: [string, string];
  salary: number;
  /**
   * 发薪日
   */
  salaryDay: number;
  resetTime: EResetTime;
  updateAll?: (params: {
    newWorkTime: [string, string];
    newAfternoonTime: [string, string];
    newSalary: number;
    newResetTime: EResetTime;
    newSalaryDay: number;
  }) => void;
};

const UserConfigContext = createContext<TUserConfig>({
  salary: 3000,
  salaryDay: 15,
  resetTime: EResetTime.周末双休,
});

export const UserConfigContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [workTime, setWorkTime] = useState<[string, string]>([
    "09:00",
    "18:00",
  ]);

  const [afternoonTime, setAfternoonTime] = useState<[string, string]>([
    "11:50",
    "13:20",
  ]);

  const [salary, setSalary] = useState<number>(15000);

  const [salaryDay, setSalaryDay] = useState<number>(15);

  const [resetTime, setResetTime] = useState<EResetTime>(EResetTime.周末双休);

  useEffect(() => {
    const _workTime = getStorageSync("_gzyy_worktime");
    const _afternoonTime = getStorageSync("_gzyy_afternonetime");
    const _salary = getStorageSync("_gzyy_salary");
    const _resetTime = getStorageSync("_gzyy_resettime");
    const _salaryDay = getStorageSync("_gzyy_salaryday");
    updateAll({
      newWorkTime: _workTime ? JSON.parse(_workTime) : ["09:00", "18:00"],
      newAfternoonTime: _afternoonTime
        ? JSON.parse(_afternoonTime)
        : ["11:50", "13:20"],
      newSalary: _salary || 15000,
      newResetTime: _resetTime || EResetTime.周末双休,
      newSalaryDay: _salaryDay || 15,
    });
  }, []);

  const updateWorkTime = (time: string, type: "start" | "end") => {
    const newArr = cloneDeep(workTime);
    if (type === "start") {
      newArr[0] = time;
    } else {
      newArr[1] = time;
    }
    setWorkTime(newArr);
  };

  const updateAfternoonTime = (time: string, type: "start" | "end") => {
    const newArr = cloneDeep(afternoonTime);
    if (type === "start") {
      newArr[0] = time;
    } else {
      newArr[1] = time;
    }
    setAfternoonTime(newArr);
  };

  const updateSalary = (salary: number) => {
    setSalary(salary);
  };

  const updateResetTime = (resetTime: EResetTime) => {
    setResetTime(resetTime);
  };

  const updateAll = ({
    newWorkTime,
    newAfternoonTime,
    newSalary,
    newResetTime,
    newSalaryDay,
  }: {
    newWorkTime: [string, string];
    newAfternoonTime: [string, string];
    newSalary: number;
    newResetTime: EResetTime;
    newSalaryDay: number;
  }) => {
    setWorkTime(newWorkTime);
    setStorageSync("_gzyy_worktime", JSON.stringify(newWorkTime));
    setAfternoonTime(newAfternoonTime);
    setStorageSync("_gzyy_afternonetime", JSON.stringify(newAfternoonTime));
    setSalary(newSalary);
    setStorageSync("_gzyy_salary", newSalary);
    setSalaryDay(newSalaryDay);
    setStorageSync("_gzyy_salaryday", newSalaryDay);
    setResetTime(newResetTime);
    setStorageSync("_gzyy_resettime", newResetTime);
  };

  return (
    <UserConfigContext.Provider
      value={{
        workTime,
        afternoonTime,
        salary,
        resetTime,
        salaryDay,
        updateAll,
      }}
    >
      {children}
    </UserConfigContext.Provider>
  );
};

export function useUserConfig() {
  return useContext(UserConfigContext);
}
