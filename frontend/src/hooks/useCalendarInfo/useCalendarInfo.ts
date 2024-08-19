import { useState } from 'react';

import CALENDAR_PROPERTIES from '@constants/calendar';

import { generateMonthDaySlots, getCurrentDateInfo, getDateInfo } from './useCalendarInfo.utils';

interface YearMonthInfo {
  year: number;
  month: number;
  daySlotCount: number;
}

interface UseCalendarInfoReturn {
  yearMonthInfo: YearMonthInfo;
  handleGetDateInfo: (index: number) => ReturnType<typeof getDateInfo>;
  handlePrevMonthMove: () => void;
  handleNextMonthMove: () => void;
  isCurrentDate: boolean;
}

type UseCalendarInfoHook = () => UseCalendarInfoReturn;

/**
 * useCalendarInfo 훅은 달력 컴포넌트에서 사용할 연도, 월, 날짜 관련 정보를 관리합니다.
 * 현재 연도와 월을 기반으로 달력의 날짜 슬롯을 생성하고, 이전 달 또는 다음 달로 이동하는 기능을 제공합니다. (@해리)
 *
 * @returns {UseCalendarInfoReturn}
 *
 * 아래는 useCalendarInfo 훅 반환 타입에 대한 간단한 설명입니다. :)
 * @property {YearMonthInfo} yearMonthInfo - 현재 선택된 연도, 월, 그리고 해당 월의 일 수 정보를 담고 있는 객체
 * @property {(index: number) => ReturnType<typeof getDateInfo>} handleGetDateInfo - 특정 날짜 슬롯의 정보를 가져오는 함수
 * @property {() => void} handlePrevMonthMove - 이전 달로 이동하는 함수
 * @property {() => void} handleNextMonthMove - 다음 달로 이동하는 함수
 * @property {boolean} isCurrentDate - 현재 연도와 월이 오늘의 연도와 월과 일치하는지 여부
 */

const useCalendarInfo: UseCalendarInfoHook = () => {
  const { currentDate, currentYear, currentMonth } = getCurrentDateInfo();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const isCurrentDate = year === currentYear && month === currentMonth;
  const { firstDayIndex, daySlotCount } = generateMonthDaySlots(year, month);

  const handleGetDateInfo = (index: number) => {
    return getDateInfo({ year, month, firstDayIndex, index, currentDate });
  };

  const handlePrevMonthMove = () => {
    if (isCurrentDate) return;

    if (month === CALENDAR_PROPERTIES.firstMonth) {
      setYear(year - 1);
      setMonth(CALENDAR_PROPERTIES.lastMonth);
      return;
    }

    setMonth(month - 1);
  };

  const handleNextMonthMove = () => {
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
    handleGetDateInfo,
    handlePrevMonthMove,
    handleNextMonthMove,
    isCurrentDate,
  };
};

export default useCalendarInfo;
