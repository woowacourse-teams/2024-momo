import { useState } from 'react';

import CALENDAR_PROPERTIES from '@constants/calendar';

import { getCurrentDateInfo, getDayInfo, getYearMonthInfo } from './useCalendarInfo.utils';

export default function useCalendarInfo() {
  const { currentDate, currentYear, currentMonth } = getCurrentDateInfo();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const isCurrentDate = year === currentYear && month === currentMonth;
  const { firstDayIndex, daySlotCount } = getYearMonthInfo(year, month);

  const handleGetDayInfo = (index: number) => {
    return getDayInfo({ year, month, firstDayIndex, index, currentDate });
  };

  const handlePrevMonth = () => {
    if (isCurrentDate) return;

    if (month === CALENDAR_PROPERTIES.firstMonth) {
      setYear(year - 1);
      setMonth(CALENDAR_PROPERTIES.lastMonth);
      return;
    }

    setMonth(month - 1);
  };

  const handleNextMonth = () => {
    if (month === CALENDAR_PROPERTIES.lastMonth) {
      setYear(year + 1);
      setMonth(CALENDAR_PROPERTIES.firstMonth);
      return;
    }

    setMonth(month + 1);
  };

  return {
    yearMonthInfo: {
      year,
      month,
      daySlotCount,
    },
    handleGetDayInfo,
    handlePrevMonth,
    handleNextMonth,
    isCurrentDate,
  } as const;
}
