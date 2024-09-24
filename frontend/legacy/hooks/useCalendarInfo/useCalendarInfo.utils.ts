import { getHolidayNames } from '@hyunbinseo/holidays-kr';
import type { DateInfo, MonthStatus, MonthlyDays } from 'types/calendar';

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

const getDateBaseInfo = (date: Date) => {
  const currentYear = getYear(date);
  const currentMonth = getMonth(date);
  const currentDate = getDate(date);
  const currentDay = getDay(date);

  return { currentYear, currentMonth, currentDate, currentDay };
};

export const getDateInfo2 = (date: Date, today: Date) => {
  const { currentYear, currentMonth, currentDate, currentDay } = getDateBaseInfo(date);

  const currentFullDate = getFullDate(date);
  const todayFullDate = getFullDate(today);

  const holidayName = getHolidayNames(date);
  const formattedHolidayName = holidayName ? holidayName[0] : null;
  const isHoliday = formattedHolidayName !== null;

  const isSaturday = currentDay === CALENDAR_PROPERTIES.saturdayNumber;
  const isSunday = currentDay === CALENDAR_PROPERTIES.sundayNumber;
  const isPrevDate = currentFullDate < todayFullDate;

  const isToday = currentFullDate === todayFullDate;

  return {
    date: currentDate,
    currentFullDate,
    isHoliday,
    isToday,
    isSunday,
    isSaturday,
    isPrevDate,
    holidayName: formattedHolidayName,
  } as const;
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

export const getMonth = (date: Date) => date.getMonth();
export const getYear = (date: Date) => date.getFullYear();
export const getDay = (date: Date) => date.getDay();
export const getDate = (date: Date) => date.getDate();
export const getFullDate = (date: Date) => {
  const year = getYear(date);
  const month = String(getMonth(date) + 1).padStart(2, '0');
  const day = String(getDate(date)).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const setFirstDate = (date: Date) => {
  const newDate = new Date(date);
  newDate.setDate(1);

  return newDate;
};

export const getNumberOfWeeks = (date: Date) => {
  const firstOfMonth = setFirstDate(date);
  const daysInMonth = new Date(getYear(date), getMonth(date) + 1, 0).getDate();
  const dayOfWeek = firstOfMonth.getDay();

  return Math.ceil((daysInMonth + ((dayOfWeek + 7) % 7)) / 7);
};

export const getMonthlyStartIndex = (date: Date) => {
  const firstOfMonth = setFirstDate(date);
  return (firstOfMonth.getDay() + 7) % 7;
};

export const getWeeklyDate = (startDate: Date, currentMonth: number): DateInfo[] =>
  Array.from({ length: CALENDAR_PROPERTIES.daysInOneWeek }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(getDate(startDate) + i);

    let status: MonthStatus;
    if (getMonth(date) < currentMonth || (getMonth(date) === 11 && currentMonth === 0)) {
      status = 'prevMonth';
    } else if (getMonth(date) > currentMonth || (getMonth(date) === 0 && currentMonth === 11)) {
      status = 'nextMonth';
    } else {
      status = 'currentMonth';
    }

    return {
      key: `${date}`,
      value: date,
      status,
    };
  });

export const getMonthlyDate = (date: Date): MonthlyDays => {
  const numberOfWeeks = getNumberOfWeeks(date);
  const monthlyStartDate = setFirstDate(new Date(date));
  monthlyStartDate.setDate(1 - getMonthlyStartIndex(date));

  return Array.from({ length: numberOfWeeks }, (_, i) => {
    const newDate = new Date(monthlyStartDate);
    newDate.setDate(getDate(monthlyStartDate) + 7 * i);

    return {
      key: getYear(date) * getMonth(date) + i,
      value: getWeeklyDate(newDate, getMonth(date)),
    };
  });
};
