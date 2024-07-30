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
   * 午休时间
   */
  const afternoonRestTime = afternoonTime?.[0] || "11:50:00";

  /**
   * 下班时间
   */
  const goOffWorkTime = workTime?.[1] || "18:00:00";

  /**
   * 日薪
   */
  const daySalary = salary / 30;

  const offWorkMsg = timeUntil(`${year}-${month}-${day} ${goOffWorkTime}`);
  const afterRestMsg = timeUntil(
    `${year}-${month}-${day} ${afternoonRestTime}`
  );

  const afternoonRestProgress = calculateProgress(
    `${year}-${month}-${day} ${workStartTime}`,
    `${year}-${month}-${day} ${afternoonRestTime}`
  );

  const offWorkProgress = calculateProgress(
    `${year}-${month}-${day} ${workStartTime}`,
    `${year}-${month}-${day} ${goOffWorkTime}`
  );

  const todayMakeMoney = Number(daySalary * (offWorkProgress / 100)).toFixed(2);

  return {
    offWorkMsg,
    afterRestMsg,
    offWorkProgress,
    afternoonRestProgress,
    todayMakeMoney,
  };
}
