type DateFormat = 'korean' | 'standard';

interface FormatDateProps {
  fullDate: string; // 'YYYY-MM-DD' 형식
  dayOfWeek: string; // '월', '화', '수' 등
  format?: DateFormat;
}

// format이 korean일 때, "12월 25일(수)" 형태로 반환
// format이 standard일 때, "2024/12/25(수)" 형태로 반환
export const formatFullDate = ({ fullDate, dayOfWeek, format = 'standard' }: FormatDateProps) => {
  const [year, month, day] = fullDate.split('-');

  if (format === 'korean') return `${month}월 ${day}일(${dayOfWeek})`;
  return `${year}/${month}/${day}(${dayOfWeek})`;
};

// 오후 6시, 오전 3시 와 같은 형태로 반환
export const formatTime = (time: string): string => {
  const hour = parseInt(time, 10);
  const hourPrefix = hour >= 12 ? '오후' : '오전';
  const formattedHour = hour % 12 || 12;

  return `${hourPrefix} ${formattedHour}시`;
};

export const getYear = (date: Date) => date.getFullYear();
export const getMonth = (date: Date) => date.getMonth();
export const getDay = (date: Date) => date.getDay();
export const getDate = (date: Date) => date.getDate();
export const getFullDate = (date: Date) => {
  const year = getYear(date);
  const month = String(getMonth(date) + 1).padStart(2, '0');
  const day = String(getDate(date)).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const hasSelectableDaysInMonth = (currentMonth: number, schedules: string[]) => {
  const availableMonths = schedules.map((schedule) => Number(schedule.split('-')[1]));

  return availableMonths.includes(currentMonth + 1);
};

export const isSameDate = (startDate: Date, endDate: Date) => {
  return (
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getDate() === endDate.getDate()
  );
};
