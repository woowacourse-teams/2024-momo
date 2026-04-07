import { useState } from 'react';
import type { MonthlyDays } from 'types/calendar';

import useToast from '@hooks/useToast/useToast';

import { getFullDate, getMonth, getYear } from '@utils/date';

import { DAY_OF_WEEK_KR } from '@constants/date';
import { TOAST_MESSAGES } from '@constants/toasts';

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

type MonthDelta = -1 | 1;

const useCalendar = (): useCalendarReturn => {
  const TODAY = new Date();
  const ONE_YEAR_LATER = getFullDate(new Date(getYear(TODAY) + 1, getMonth(TODAY)));

  const [currentFullDate, setCurrentFullDate] = useState(new Date());
  const { addToast } = useToast();

  const currentYear = getYear(currentFullDate);
  const currentMonth = getMonth(currentFullDate);
  const isCurrentMonth = getYear(TODAY) === currentYear && getMonth(TODAY) === currentMonth;

  const moveMonth = (monthDelta: MonthDelta) => {
    setCurrentFullDate(new Date(currentYear, currentMonth + monthDelta));
  };

  const moveToPrevMonth = () => {
    moveMonth(-1);
  };

  const moveToNextMonth = () => {
    const fullDate = getFullDate(currentFullDate);

    if (new Date(fullDate).getTime() >= new Date(ONE_YEAR_LATER).getTime()) {
      addToast({
        message: TOAST_MESSAGES.OUT_OF_ONE_YEAR_RANGE,
        type: 'warning',
        duration: 2000,
      });
      return;
    }

    moveMonth(1);
  };

  const monthlyCalendarDate = getMonthlyCalendarDate(currentFullDate);

  return {
    headers: {
      currentYear,
      currentMonth,
      weekDays: DAY_OF_WEEK_KR,
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
