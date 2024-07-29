import {
  calculateProgress,
  getPreviousAndNextMonth,
  getTodayYMD,
  timeUntil,
} from "@/utils/time";

export function useMonthJobData() {
  /**
   * 发薪日
   */
  const salaryDay = 15;
  const { year, month, day } = getTodayYMD();

  const { previousMonthDate, nextMonthDate } = getPreviousAndNextMonth(
    `${year}-${month}-${salaryDay}`
  );

  console.log("ppp", previousMonthDate, nextMonthDate);
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

  /**
   * 薪水
   */
  const salary = 15300;

  const monthMakeMoney = Number(
    salary * (monthSalaryDayProgress / 100)
  ).toFixed(2);

  return {
    monthMakeMoney,
    monthSalaryDayProgress,
    receiveMonthSalaryMsg,
  };

  // /**
  //  * 日薪
  //  */
  // const daySalary = salary / 30;

  // const offWorkMsg = timeUntil(goOffWorkTime);
  // const afterRestMsg = timeUntil(afternoonRestTime);

  // const afternoonRestProgress = calculateProgress(
  //   `${year}-${month}-${day} ${workStartTime}`,
  //   `${year}-${month}-${day} ${afternoonRestTime}`
  // );

  // const offWorkProgress = calculateProgress(
  //   `${year}-${month}-${day} ${workStartTime}`,
  //   `${year}-${month}-${day} ${goOffWorkTime}`
  // );

  // const todayMakeMoney = Number(daySalary * (offWorkProgress / 100)).toFixed(2);

  // return {
  //   offWorkMsg,
  //   afterRestMsg,
  //   offWorkProgress,
  //   afternoonRestProgress,
  //   todayMakeMoney,
  // };
}
