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
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  // const months = targetDate.getMonth() - now.getMonth() + years * 12;
  let months = targetDate.getMonth() - now.getMonth() + years * 12;

  if (days < 30) {
    months--;
  }

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

/**
 * 根据周几 获取 完整的日期格式
 */
export function getDatesByDayNumber(dayNumber) {
  // 获取今天的日期
  const today = dayjs();

  // 计算本周的开始日期（周一）
  const startOfWeek = today.startOf("week").add(1, "day"); // 将周日调整为周一

  // 判断今天的周数是否大于传入的 dayNumber
  let targetDate;
  if (today.day() >= dayNumber) {
    // 如果今天的周数大于 dayNumber，获取下一周的日期
    targetDate = startOfWeek.add(7, "day").add(dayNumber - 1, "day");
  } else {
    // 否则获取本周的日期
    targetDate = startOfWeek.add(dayNumber - 1, "day");
  }

  // 返回格式化后的日期
  return targetDate.format("YYYY-MM-DD");
}

export function getDaysInMonth(month) {
  // 确保传入的月份在 1 到 12 之间
  if (month < 1 || month > 12) {
    throw new Error("月份必须在 1 到 12 之间");
  }

  // 获取当前年份
  const year = dayjs().year();

  // 获取指定月份的第一天
  const startOfMonth = dayjs(`${year}-${month}-01`);

  // 获取下一个月份的第一天
  const startOfNextMonth = startOfMonth.add(1, "month");

  // 计算该月份的天数
  const daysInMonth = startOfNextMonth.diff(startOfMonth, "day");

  return daysInMonth;
}

/**
 * 获取下一个周号
 * 周号 1-7 表示 周一到周日
 */
export function getNextDayNumber(dayNumber: number) {
  if (dayNumber === 7) {
    return 1;
  }
  return dayNumber + 1;
}

/**
 * 获取前一个周号
 * 周号 1-7 表示 周一到周日
 */
export function getPrevDayNumber(dayNumber: number) {
  if (dayNumber === 1) {
    return 7;
  }
  return dayNumber - 1;
}

export enum ECheckStatus {
  小于开始时间,
  处于两个时间内,
  大于结束时间,
}

export function checkTimeStatus(
  startTime: string,
  endTime: string,
  checkTime: string
) {
  // 将时间字符串转换为 Date 对象
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const checkDate = new Date(checkTime);

  // 检查状态
  if (checkDate < startDate) {
    return ECheckStatus.小于开始时间;
  } else if (checkDate > endDate) {
    return ECheckStatus.处于两个时间内;
  } else {
    return ECheckStatus.大于结束时间;
  }
}

/**
 * 传递一个日期格式 获取上周的和下周的时间
 * 如传递 2024-07-29 则 分别为 2024-07-22 和 2024-08-05
 */
export function getAdjacentWeeks(dateString) {
  // 将输入的日期字符串转换为 Date 对象
  const date = new Date(dateString);

  // 计算上周和下周的日期
  const lastWeek = new Date(date);
  const nextWeek = new Date(date);

  // 上周的日期
  lastWeek.setDate(date.getDate() - 7);

  // 下周的日期
  nextWeek.setDate(date.getDate() + 7);

  // 格式化日期为 YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split("T")[0];

  return {
    lastWeek: formatDate(lastWeek),
    nextWeek: formatDate(nextWeek),
  };
}

/**
 * 内部使用 将时间转换为妙
 */
function convertToSeconds(time) {
  // 如果没有提供秒数，默认设置为 00
  if (time.split(":").length === 2) {
    time += ":00";
  }
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * time1 是否 大于time2
 */
export function bigThan(time1, time2) {
  return convertToSeconds(time1) > convertToSeconds(time2);
}

/**
 * time1 是否 小于time2
 */
export function smallThan(time1, time2) {
  return convertToSeconds(time1) < convertToSeconds(time2);
}

/**
 * time1 是否 等于time2
 */
export function equalThan(time1, time2) {
  return convertToSeconds(time1) === convertToSeconds(time2);
}
