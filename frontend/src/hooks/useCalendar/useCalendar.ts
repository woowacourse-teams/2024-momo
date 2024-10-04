import { useState } from 'react';
import type { MonthlyDays } from 'types/calendar';

import { getMonth, getYear } from '@utils/date';

import { getMonthlyCalendarDate } from './useCalendar.utils';

interface useCalendarReturn {
  headers: {
    currentYear: number;
    currentMonth: number;
    weekDays: string[];
  };
  body: {
    value: MonthlyDays;
    today: Date;
  };
  view: {
    moveToNextMonth: () => void;
    moveToPrevMonth: () => void;
  };
  isCurrentMonth: boolean;
}

const TODAY = new Date();

const useCalendar = (): useCalendarReturn => {
  const [currentFullDate, setCurrentFullDate] = useState(new Date());

  const currentYear = getYear(currentFullDate);
  const currentMonth = getMonth(currentFullDate);
  const isCurrentMonth = getYear(TODAY) === currentYear && getMonth(TODAY) === currentMonth;

  const moveToPrevMonth = () => {
    setCurrentFullDate(new Date(currentYear, currentMonth - 1));
  };

  const moveToNextMonth = () => {
    setCurrentFullDate(new Date(currentYear, currentMonth + 1));
  };

  const monthlyCalendarDate = getMonthlyCalendarDate(currentFullDate);

  return {
    headers: {
      currentYear,
      currentMonth,
      weekDays: ['일', '월', '화', '수', '목', '금', '토'],
    },
    body: {
      today: TODAY,
      value: monthlyCalendarDate,
    },
    view: {
      moveToNextMonth,
      moveToPrevMonth,
    },
    isCurrentMonth,
  };
};

export default useCalendar;
