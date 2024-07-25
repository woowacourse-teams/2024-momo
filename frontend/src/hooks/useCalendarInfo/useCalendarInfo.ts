import { useState } from 'react';

import { getDayInfo, getYearMonthInfo } from './useCalendarInfo.utils';

export default function useCalendarInfo() {
  // TODO : L7 ~ L9 getCurrentDate 함수로 추상화 예정(@해리)
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  const { firstDayIndex, daySlotCount } = getYearMonthInfo(year, month);

  const handleGetDayInfo = (index: number) => {
    return getDayInfo({ year, month, firstDayIndex, index, currentDate });
  };

  const handlePrevMonth = () => {
    // TODO : isCurrentDate 함수로 추상화(@해리)
    if (year === currentYear && month === currentMonth) return;

    if (month === 1) {
      setYear(year - 1);
      setMonth(12); // TODO : 상수화(@해리)
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
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
  } as const;
}
