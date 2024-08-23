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

export const generateMonthDaySlots = (year: number, month: number) => {
  const startDate = new Date(year, month - 1, 1);
  const firstDayIndex = startDate.getDay();

  const lastDateOfMonth = new Date(year, month, 0);
  const lastDayNumber = lastDateOfMonth.getDate();

  const daySlotCount = firstDayIndex + lastDayNumber;

  return { firstDayIndex, daySlotCount } as const;
};

export const getDateInfo = ({
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

  const fullDate = `${year}-${formattedMonth}-${String(date).padStart(2, '0')}`;
  const todayFullDate = `${year}-${formattedCurrentMonth}-${String(todayDate).padStart(2, '0')}`;

  const isValidDate = index >= firstDayIndex;
  const isHoliday = index % CALENDAR_PROPERTIES.daysInOneWeek === 0;
  const isSaturday = index % CALENDAR_PROPERTIES.daysInOneWeek === 6;
  const isPrevDate = formattedMonth === formattedCurrentMonth && date < todayDate;
  const isToday = fullDate === todayFullDate;

  return { date, fullDate, isValidDate, isToday, isSaturday, isHoliday, isPrevDate } as const;
};
