import {
  calculateProgress,
  getPreviousAndNextMonth,
  getTodayYMD,
  timeUntil,
} from "@/utils/time";
import { useUserConfig } from "./useUserConfig";

export function useMonthJobData() {
  const { salary } = useUserConfig();

  /**
   * 发薪日
   */
  const salaryDay = 15;
  const { year, month, day } = getTodayYMD();

  const { previousMonthDate, nextMonthDate } = getPreviousAndNextMonth(
    `${year}-${month}-${salaryDay}`
  );

  let monthSalaryDayProgress = 0;
  /**
   * 获取薪水
   */
  let receiveMonthSalaryMsg;

  if (+day > salaryDay) {
    monthSalaryDayProgress = calculateProgress(
      `${year}-${month}-${salaryDay} 13:00:00`,
      `${nextMonthDate} 13:00:00`
    );
    receiveMonthSalaryMsg = timeUntil(`${nextMonthDate} 13:00:00`);
  } else {
    monthSalaryDayProgress = calculateProgress(
      `${previousMonthDate} 13:00:00`,
      `${year}-${month}-${salaryDay} 13:00:00`
    );
    receiveMonthSalaryMsg = timeUntil(
      `${year}-${month}-${salaryDay}  13:00:00`
    );
  }

  const monthMakeMoney = Number(
    salary * (monthSalaryDayProgress / 100)
  ).toFixed(2);

  return {
    monthMakeMoney,
    monthSalaryDayProgress,
    receiveMonthSalaryMsg,
  };
}
