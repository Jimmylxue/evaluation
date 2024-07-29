import {
  calculateProgress,
  getPreviousAndNextMonth,
  getTodayYMD,
  timeUntil,
} from "@/utils/time";

export function useYearJobData() {
  /**
   * 发薪日
   */
  const salaryDay = 15;
  const { year, month, day } = getTodayYMD();

  const { previousMonthDate, nextMonthDate } = getPreviousAndNextMonth(
    `${year}-${month}-${salaryDay}`
  );

  console.log("ppp", previousMonthDate, nextMonthDate);
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

  /**
   * 薪水
   */
  const salary = 15300;
  const yearMakeMoney = Number(salary * 12 * (yearProgress / 100)).toFixed(2);
  return {
    yearProgress,
    yearMakeMoney,
    receiveYearSalaryMsg,
  };
}
