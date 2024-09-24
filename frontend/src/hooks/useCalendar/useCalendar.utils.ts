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
  const firstOfMonth = setFirstDate(date);
  const daysInMonth = getDaysInMonth(date);
  const dayOfWeek = getDay(firstOfMonth);

  return Math.ceil((daysInMonth + dayOfWeek) / 7);
};

export const getMonthlyStartIndex = (date: Date) => {
  const firstOfMonth = setFirstDate(date);

  return firstOfMonth.getDay();
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

/**
 * 주어진 날짜를 기준으로 해당 월의 달력 데이터를 계산하여 반환.
 * 이 함수는 해당 월이 몇 주에 걸쳐 있는지 계산하고, 주마다 날짜 정보를 생성하여 반환.
 * 월의 첫 번째 주와 마지막 주가 이전 달 또는 다음 달의 날짜로 채워질 수 있다.
 * 이렇게 한 이유는 현재 모모 서비스에서는, 이전 달 또는 다음 달의 데이터를 활용하고 있지 않지만 요구 사항이 변경되어 필요하게 되면 필요에 따라 유연하게 뽑아서 사용할 수 있도록 하기 위해서이다.
 *
 * @param {Date} date - 해당 월을 나타내는 JavaScript `Date` 객체. (해당 월의 아무 날짜나 가능합니다)
 *
 * @returns {MonthlyDays} 해당 월의 주 단위 데이터를 포함하는 배열을 반환합니다. 각 주는 객체로 표현된다. 아래는 객체에 대한 설명.
 *  - `key`: 해당 주의 고유 식별자.
 *  - `value`: `DateInfo` 객체 배열로, 각 날짜의 정보를 포함.
 *    - `key`: 특정 날짜를 나타내는 문자열 (예: `${date}` 형태).
 *    - `value`: 해당 날짜의 `Date` 객체.
 *    - `status`: 해당 날짜가 'prevMonth' (이전 달), 'currentMonth' (현재 달), 'nextMonth' (다음 달) 중 어디에 속하는지 나타내는 값.
 *
 * 함수 실행 과정:
 * 1. `getNumberOfWeeks` 함수를 사용하여 해당 월이 몇 주에 걸쳐 있는지 계산합니다.
 * 2. `getMonthlyStartIndex` 함수를 사용하여 해당 월의 첫 번째 주에 이전 달의 날짜가 필요한지 계산합니다.
 * 3. `getWeeklyDate` 함수를 사용하여 주별로 날짜 데이터를 생성하며, 각 날짜가 현재 달, 이전 달, 또는 다음 달에 속하는지 판단하여 `status` 값을 설정합니다.
 *
 * 반환 데이터 예시:
 * [
 *   {
 *     key: 2023090, // 2023-09의 첫 번째 주
 *     value: [
 *       { key: '2023-08-27', value: Date, status: 'prevMonth' }, 이전 달 데이터인 8월 데이터가 포함되고, prevMonth 상태를 가짐.
 *       { key: '2023-08-28', value: Date, status: 'prevMonth' },
 *       ...
 *       { key: '2023-09-03', value: Date, status: 'currentMonth' }
 *     ]
 *   },
 *   ...
 *   {
 *     key: 2023094,
 *     value: [
 *       { key: '2023-09-25', value: Date, status: 'currentMonth' },
 *       { key: '2023-09-26', value: Date, status: 'currentMonth' },
 *       ...
 *       { key: '2023-10-01', value: Date, status: 'nextMonth' } // 다음 달 데이터인 10월 데이터가 포함되고, nextMonth 상태를 가짐.
 *     ]
 *   }
 * ]
 */
export const getMonthlyDate = (date: Date): MonthlyDays => {
  const numberOfWeeks = getNumberOfWeeks(date);
  const monthlyStartDate = setFirstDate(new Date(date));
  monthlyStartDate.setDate(1 - getMonthlyStartIndex(date));

  return Array.from({ length: numberOfWeeks }, (_, i) => {
    const newDate = new Date(monthlyStartDate);
    newDate.setDate(getDate(monthlyStartDate) + CALENDAR_PROPERTIES.daysInOneWeek * i);

    return {
      key: getYear(date) * getMonth(date) + i,
      value: getWeeklyDate(newDate, getMonth(date)),
    };
  });
};
