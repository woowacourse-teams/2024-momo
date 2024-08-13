import CALENDAR_PROPERTIES from '@constants/calendar';

export const getCurrentDateInfo = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  return {
    currentDate,
    currentYear,
    currentMonth,
  } as const;
};

export const getYearMonthInfo = (year: number, month: number) => {
  const startDate = new Date(year, month - 1, 1);
  // 일, 월, 화,,,를 인덱스 0, 1, 2로 표현(@해리)
  const firstDayIndex = startDate.getDay();
  // new Date(2024, 8, 0) 날짜 인덱스는 8부터 시작하기 때문에 8은 9월을 뜻함, 세 번째 인자인 0은 9월 1일의 전 날을 뜻하기 때문에 마지막 날을 의미한다. (@해리)
  const lastDayOfMonthDate = new Date(year, month, 0);
  const lastDayNumber = lastDayOfMonthDate.getDate();
  const daySlotCount = firstDayIndex + lastDayNumber;

  return { firstDayIndex, daySlotCount } as const;
};

export const getDayInfo = ({
  year,
  month,
  firstDayIndex,
  index,
  currentDate,
}: {
  year: number;
  month: number;
  firstDayIndex: number;
  index: number;
  currentDate: Date;
}) => {
  const date = index - firstDayIndex + 1;
  const todayDate = currentDate.getDate();
  const formattedMonth = String(month).padStart(2, '0');
  const formattedCurrentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

  const dateString = `${year}-${formattedMonth}-${String(date).padStart(2, '0')}`;
  const todayString = `${year}-${formattedCurrentMonth}-${String(todayDate).padStart(2, '0')}`;

  const isDate = index >= firstDayIndex;
  const isToday = dateString === todayString;
  const isHoliday = index % CALENDAR_PROPERTIES.daysInOneWeek === 0;
  const isSaturday = index % CALENDAR_PROPERTIES.daysInOneWeek === 6;
  const isPrevDay = formattedMonth === formattedCurrentMonth && date < todayDate;

  return { date, dateString, isDate, isToday, isSaturday, isHoliday, isPrevDay } as const;
};
