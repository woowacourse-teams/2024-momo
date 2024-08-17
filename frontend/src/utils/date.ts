interface FormatDateProps {
  fullDate: string; // 'YYYY-MM-DD' 형식
  dayOfWeek: string; // '월', '화', '수' 등
}

export const formatFullDate = ({ fullDate, dayOfWeek }: FormatDateProps) => {
  const [year, month, day] = fullDate.split('-');

  return `${month}월 ${day}일(${dayOfWeek})`;
};

export const formatTime = (time: string): string => {
  const hour = parseInt(time, 10);
  const hourPrefix = hour >= 12 ? '오후' : '오전';
  const formattedHour = hour % 12 || 12;

  return `${hourPrefix} ${formattedHour}시`;
};
