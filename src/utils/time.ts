import dayjs from "dayjs";
export function timeUntil(targetTime) {
  // 获取当前时间
  const now = new Date();

  // 创建目标时间的日期对象
  const targetDate = new Date(targetTime);

  // 如果目标时间已经过去，则返回 0
  if (targetDate < now) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  // 计算时间差（毫秒）
  // @ts-ignore
  const diff = targetDate - now;

  // 计算年、月、日
  const years = targetDate.getFullYear() - now.getFullYear();
  const months = targetDate.getMonth() - now.getMonth() + years * 12;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  // 计算小时、分钟和秒
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
}

/**
 * 获取今天的年月日
 */
export function getTodayYMD() {
  const today = dayjs();
  const year = today.year();
  const month = (today.month() + 1).toString().padStart(2, "0"); // 月份从0开始，所以加1，并补零
  const day = today.date().toString().padStart(2, "0"); // 补零
  return { year, month, day };
}

/**
 * 计算当前时间  在两个时间之间的进度
 * 传递 标准时间格式  2024-09-30 14:30:30
 */
export function calculateProgress(startTime: string, endTime: string) {
  const startTimestamp = dayjs(startTime).valueOf();
  const endTimestamp = dayjs(endTime).valueOf();
  const now = Date.now(); // 获取当前时间戳

  // 确保开始时间小于结束时间
  if (startTimestamp >= endTimestamp) {
    throw new Error("开始时间必须小于结束时间");
  }

  // 计算进度
  if (now < startTimestamp) {
    return 0; // 当前时间在开始时间之前
  } else if (now > endTimestamp) {
    return 100; // 当前时间在结束时间之后
  } else {
    const progress =
      ((now - startTimestamp) / (endTimestamp - startTimestamp)) * 100;
    return progress;
  }
}

/**
 * 获取上个月的 年月日 和 下个月的年月日
 */
export function getPreviousAndNextMonth(dateStr) {
  const date = dayjs(dateStr);

  // 获取上一个月
  const previousMonth = date.subtract(1, "month");
  const previousMonthDate =
    previousMonth.date() === date.date()
      ? previousMonth
      : previousMonth.date(Math.min(date.date(), previousMonth.daysInMonth()));

  // 获取下一个月
  const nextMonth = date.add(1, "month");
  const nextMonthDate =
    nextMonth.date() === date.date()
      ? nextMonth
      : nextMonth.date(Math.min(date.date(), nextMonth.daysInMonth()));

  return {
    previousMonthDate: previousMonthDate.format("YYYY-MM-DD"),
    nextMonthDate: nextMonthDate.format("YYYY-MM-DD"),
  };
}
