import type { DateInfo, MonthStatus, MonthlyDays } from 'types/calendar';

import { getDate, getDay, getMonth, getYear } from '@utils/date';

import CALENDAR_PROPERTIES from '@constants/calendar';

export const setFirstDate = (date: Date) => {
  const newDate = new Date(date);
  newDate.setDate(1);

  return newDate;
};

export const getDaysInMonth = (date: Date) => {
  const lastDateOfMonth = getDate(new Date(getYear(date), getMonth(date) + 1, 0));

  return lastDateOfMonth;
};

export const getNumberOfWeeks = (date: Date) => {
  const firstDateOfMonth = setFirstDate(date);
  const daysInMonth = getDaysInMonth(date);
  const dayOfWeek = getDay(firstDateOfMonth);

  return Math.ceil((daysInMonth + dayOfWeek) / 7);
};

export const getMonthlyStartIndex = (date: Date) => {
  const firstDateOfMonth = setFirstDate(date);

  return firstDateOfMonth.getDay();
};

const getMonthStatus = (targetDate: Date, currentMonthIndex: number): MonthStatus => {
  const month = getMonth(targetDate);

  if (month < currentMonthIndex) return 'prev';

  if (month > currentMonthIndex) return 'next';

  return 'current';
};

export const getWeeklyDate = (startDate: Date, currentMonthIndex: number): DateInfo[] =>
  Array.from({ length: CALENDAR_PROPERTIES.daysInOneWeek }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(getDate(startDate) + i);

    const monthStatus = getMonthStatus(date, currentMonthIndex);

    return {
      key: `${date}`,
      value: date,
      status: monthStatus,
    };
  });

export const getCalendarStartDate = (date: Date) => {
  const startDateOfMonth = setFirstDate(date);
  startDateOfMonth.setDate(1 - getMonthlyStartIndex(date));

  return startDateOfMonth;
};

export const getMonthlyCalendarDate = (date: Date): MonthlyDays => {
  const numberOfWeeks = getNumberOfWeeks(date);
  const startDateOfCalendar = getCalendarStartDate(date);

  return Array.from({ length: numberOfWeeks }, (_, i) => {
    const newDate = new Date(startDateOfCalendar);
    newDate.setDate(getDate(startDateOfCalendar) + CALENDAR_PROPERTIES.daysInOneWeek * i);

    return {
      key: getYear(date) * getMonth(date) + i,
      value: getWeeklyDate(newDate, getMonth(date)),
    };
  });
};
