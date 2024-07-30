import { calculateProgress, getTodayYMD, timeUntil } from "@/utils/time";
import { useUserConfig } from "./useUserConfig";

export function useYearJobData() {
  const { salary } = useUserConfig();
  /**
   * 发薪日
   */
  const salaryDay = 15;
  const { year } = getTodayYMD();

  let yearProgress = 0;
  /**
   * 距离过年数据
   */
  let receiveYearSalaryMsg;

  /**
   * yearProgress 主要是以 发薪日的角度来考量的 因为主要还是算钱
   */
  yearProgress = calculateProgress(
    `${Number(year) - 1}-12-${salaryDay} 13:00:00`,
    `${year}-12-${salaryDay} 13:00:00`
  );
  receiveYearSalaryMsg = timeUntil(`${Number(year) + 1}-01-01 00:00:00`);

  const yearMakeMoney = Number(salary * 12 * (yearProgress / 100)).toFixed(2);
  return {
    yearProgress,
    yearMakeMoney,
    receiveYearSalaryMsg,
  };
}
