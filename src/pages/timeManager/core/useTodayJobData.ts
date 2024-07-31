import { calculateProgress, getTodayYMD, timeUntil } from "@/utils/time";
import { useUserConfig } from "./useUserConfig";

export function useTodayJobData() {
  const { year, month, day } = getTodayYMD();
  const { workTime, afternoonTime, salary } = useUserConfig();

  /**
   * 上班时间
   */
  const workStartTime = workTime?.[0] || "09:00:00";

  /**
   * 午休开始时间
   */
  const afternoonRestTimeStart = afternoonTime?.[0] || "11:50:00";

  /**
   * 午休结束时间
   */
  const afternoonRestTimeEnd = afternoonTime?.[1] || "13:20:00";

  /**
   * 下班时间
   */
  const goOffWorkTime = workTime?.[1] || "18:00:00";

  /**
   * 日薪
   */
  const daySalary = salary / 30;

  /**
   * 下班数据
   */
  const offWorkMsg = timeUntil(`${year}-${month}-${day} ${goOffWorkTime}`);

  /**
   * 距离午休开始数据
   */
  const afterRestStartMsg = timeUntil(
    `${year}-${month}-${day} ${afternoonRestTimeStart}`
  );

  /**
   * 距离午休结束数据
   */
  const afterRestEndMsg = timeUntil(
    `${year}-${month}-${day} ${afternoonRestTimeEnd}`
  );

  /**
   * 距离午休开始进度条
   */
  const afternoonRestStartProgress = calculateProgress(
    `${year}-${month}-${day} ${workStartTime}`,
    `${year}-${month}-${day} ${afternoonRestTimeStart}`
  );

  /**
   * 距离午休结束进度条
   */
  const afternoonRestEndProgress = calculateProgress(
    `${year}-${month}-${day} ${afternoonRestTimeStart}`,
    `${year}-${month}-${day} ${afternoonRestTimeEnd}`
  );

  /**
   * 距离下班进度条
   */
  const offWorkProgress = calculateProgress(
    `${year}-${month}-${day} ${workStartTime}`,
    `${year}-${month}-${day} ${goOffWorkTime}`
  );

  const todayMakeMoney = Number(daySalary * (offWorkProgress / 100)).toFixed(2);

  return {
    offWorkMsg,
    afterRestStartMsg,
    offWorkProgress,
    afternoonRestStartProgress,
    todayMakeMoney,
    afternoonRestEndProgress,
    afterRestEndMsg,
  };
}
