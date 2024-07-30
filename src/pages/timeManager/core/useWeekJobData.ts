import {
  calculateProgress,
  checkTimeStatus,
  ECheckStatus,
  getAdjacentWeeks,
  getDatesByDayNumber,
  getNextDayNumber,
  getPrevDayNumber,
  timeUntil,
} from "@/utils/time";
import dayjs from "dayjs";
import { EResetTime, useUserConfig } from "./useUserConfig";

export function useWeekJobData() {
  const { resetTime, workTime } = useUserConfig();
  /** 休息日 -> 周六周日 */
  let weekReset = [6, 7];
  if (resetTime === EResetTime.周末双休) {
    weekReset = [6, 7];
  } else if (resetTime === EResetTime.周六一天) {
    weekReset = [6];
  } else {
    weekReset = [7];
  }

  const weekStart = `${getDatesByDayNumber(getPrevDayNumber(weekReset[0]))} ${
    workTime?.[1] || "18:00:00"
  }`;

  const weekEnd = `${getDatesByDayNumber(
    getNextDayNumber(weekReset[weekReset.length - 1])
  )} ${workTime?.[0] || "09:00:00"}`;

  /**
   * 距离周末的数据
   */
  const weekStartMsg = timeUntil(weekStart);

  /**
   * 距离周末结束数据
   */
  const weekEndMsg = timeUntil(weekEnd);

  /**
   * 当前时间 和 周末时间之间的状态
   */
  const nowWeekState = checkTimeStatus(
    weekStart,
    weekEnd,
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );

  /**
   * 距离周末进度
   */
  let weekStartProgress = 0;
  /**
   * 周末结束 距离开工进度
   */
  let weekEndProgress = 0;

  if (nowWeekState === ECheckStatus.小于开始时间) {
    // 上一个周末结束的下一天工作时间 和 这个周末开始的前一天下班时间
    weekStartProgress = calculateProgress(
      `${
        getAdjacentWeeks(
          getDatesByDayNumber(getNextDayNumber(weekReset[weekReset.length - 1]))
        ).lastWeek
      } ${workTime?.[0] || "09:00:00"}`,
      `${getDatesByDayNumber(getPrevDayNumber(weekReset[0]))} ${
        workTime?.[1] || "18:00:00"
      }`
    );
  } else if (nowWeekState === ECheckStatus.处于两个时间内) {
    weekEndProgress = calculateProgress(
      `${getDatesByDayNumber(getPrevDayNumber(weekReset[0]))} ${
        workTime?.[1] || "18:00:00"
      }`,
      `${getDatesByDayNumber(
        getNextDayNumber(weekReset[weekReset.length - 1])
      )} ${workTime?.[0] || "09:00:00"}`
    );
  } else {
    // todo 如果是 休息日是[3,4] 那么这种情况也需要处理 不过这个不急 可以后面再写
  }

  return {
    weekStartMsg,
    weekEndMsg,
    nowWeekState,
    weekStartProgress,
    weekEndProgress,
  };
}
