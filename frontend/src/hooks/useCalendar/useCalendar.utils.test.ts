import { getDate, getDay, getFullDate, getMonth, getYear } from '@utils/date';

import CALENDAR_PROPERTIES from '@constants/calendar';

import {
  getCalendarStartDate,
  getDaysInMonth,
  getMonthlyCalendarDate,
  getMonthlyStartIndex,
  getNumberOfWeeks,
  getWeeklyDate,
  setFirstDate,
} from './useCalendar.utils';

describe('Calendar utils', () => {
  const TEST_YEAR = 2024;
  const TEST_MONTH = 9;
  const TEST_DATE = 4;
  const TUESDAY_INDEX = 5;
  const TEST_FULL_DATE = '2024-10-04';
  const testDate = new Date(TEST_YEAR, TEST_MONTH, TEST_DATE);

  describe('Calendar Base util functions test', () => {
    it('getYear 함수는 올바른 년도를 반환한다.', () => {
      const year = getYear(testDate);
      expect(year).toBe(TEST_YEAR);
    });

    it('getMonth 함수는 현재 달에서 1을 뺀 값을 반환한다.', () => {
      const month = getMonth(testDate);
      expect(month).toBe(TEST_MONTH);
    });

    it('getDay 함수는 오늘 요일에 맞는 인덱스를 반환한다.', () => {
      const day = getDay(testDate);
      expect(day).toBe(TUESDAY_INDEX);
    });

    it('getDate 함수는 오늘 날짜를 반환한다.', () => {
      const date = getDate(testDate);
      expect(date).toBe(TEST_DATE);
    });

    it('getFullDate 함수는 오늘 날짜 정보를 문자열로 반환한다.', () => {
      const fullDate = getFullDate(testDate);
      expect(fullDate).toBe(TEST_FULL_DATE);
    });
  });

  describe('serFirstDate', () => {
    it('날짜 객체를 해당 달의 첫 번째 날짜로 변경한다.', () => {
      const result = setFirstDate(testDate);
      expect(getDate(result)).not.toBe(TEST_DATE);
      expect(getDate(result)).toBe(1);
    });
  });

  describe('getNumberOfWeeks', () => {
    it('해당 달이 총 몇 주로 구성되는지 계산해서 반환한다.', () => {
      const EXPECTED_NUMBER_OF_WEEKS = 5;
      const numberOfWeeksInTestDate = getNumberOfWeeks(testDate);
      expect(numberOfWeeksInTestDate).toBe(EXPECTED_NUMBER_OF_WEEKS);
    });
  });

  describe('getDaysInMonth', () => {
    it('해당 달의 전체 총 일수를 계산해서 반환한다.', () => {
      const EXPECTED_DAYS_IN_MONTH = 31;
      const dayInTestDate = getDaysInMonth(testDate);
      expect(dayInTestDate).toBe(EXPECTED_DAYS_IN_MONTH);
    });
  });

  describe('getCalendarStartDate', () => {
    it('달력을 그리기 위한 첫 번째 날짜를 계산해서 반환한다.', () => {
      const EXPECTED_CALENDAR_START_DATE = 29;
      const EXPECTED_CALENDAR_START_FULL_DATE = '2024-09-29';
      const calendarStartDate = getCalendarStartDate(testDate);

      expect(getYear(calendarStartDate)).toBe(TEST_YEAR);
      expect(getMonth(calendarStartDate)).toBe(TEST_MONTH - 1);
      expect(getDate(calendarStartDate)).toBe(EXPECTED_CALENDAR_START_DATE);
      expect(getFullDate(calendarStartDate)).toBe(EXPECTED_CALENDAR_START_FULL_DATE);
    });
  });

  describe('getWeeklyDate', () => {
    it('한 주 데이터에 이전 달이 포함되어 있으면, 해당 날짜의 상태는 prev여야 한다.', () => {
      const calendarStartDate = getCalendarStartDate(testDate);

      const firstWeeklyDate = getWeeklyDate(calendarStartDate, getMonth(testDate));
      const { status } =
        firstWeeklyDate.find(({ value }) => getMonth(value) === getMonth(testDate) - 1) ?? {};

      expect(firstWeeklyDate).toHaveLength(CALENDAR_PROPERTIES.daysInOneWeek);
      expect(status).toBe('prev');
    });

    it('한 주 데이터에 다음 달이 포함되어 있으면, 해당 날짜의 상태는 next여야 한다.', () => {
      const numberOfWeeks = getNumberOfWeeks(testDate);
      const calendarStartDate = getCalendarStartDate(testDate);
      calendarStartDate.setDate(
        getDate(calendarStartDate) + CALENDAR_PROPERTIES.daysInOneWeek * numberOfWeeks - 1,
      );

      const lastWeeklyDate = getWeeklyDate(calendarStartDate, getMonth(testDate));
      const { status } =
        lastWeeklyDate.find(({ value }) => getMonth(value) === getMonth(testDate) + 1) ?? {};

      expect(lastWeeklyDate).toHaveLength(CALENDAR_PROPERTIES.daysInOneWeek);
      expect(status).toBe('next');
    });

    it('한 주 데이터에 현재 달이 포함되어 있으면, 해당 날짜의 상태는 current여야 한다.', () => {
      const calendarStartDate = getCalendarStartDate(testDate);
      const firstWeeklyDate = getWeeklyDate(calendarStartDate, getMonth(testDate));

      const { status } =
        firstWeeklyDate.find(({ value }) => getMonth(value) === getMonth(testDate)) ?? {};

      expect(status).toBe('current');
    });
  });

  describe('getMonthlyCalendarDate', () => {
    const EXPECTED_NUMBER_OF_WEEKS = 5;
    const monthlyCalendarDate = getMonthlyCalendarDate(testDate);

    it('한 달의 달력 데이터는 해당 달의 총 주 수와 일치해야 한다.', () => {
      expect(monthlyCalendarDate).toHaveLength(EXPECTED_NUMBER_OF_WEEKS);
    });

    it('달력 데이터에서 이전 달의 날짜 개수가 올바른지 확인한다.', () => {
      const prevMonthDates = monthlyCalendarDate
        .flatMap((week) => week.value)
        .filter((day) => day.status === 'prev');
      const EXPECTED_PREV_MONTH_DAYS = getMonthlyStartIndex(testDate);

      expect(prevMonthDates).toHaveLength(EXPECTED_PREV_MONTH_DAYS);
    });

    it('달력 데이터에서 다음 달의 날짜 개수가 올바른지 확인한다.', () => {
      const numberOfWeeks = getNumberOfWeeks(testDate);
      const totalDays = CALENDAR_PROPERTIES.daysInOneWeek * numberOfWeeks;
      const daysInMonth = getDaysInMonth(testDate);
      const nextMonthDates = monthlyCalendarDate
        .flatMap((week) => week.value)
        .filter((day) => day.status === 'next');

      const PREV_MONTH_DAYS = getMonthlyStartIndex(testDate);
      const EXPECTED_NEXT_MONTH_DAYS = totalDays - PREV_MONTH_DAYS - daysInMonth;

      expect(nextMonthDates).toHaveLength(EXPECTED_NEXT_MONTH_DAYS);
    });

    it('달력 데이터에서 현재 달의 모든 날짜는 current 상태여야 한다.', () => {
      monthlyCalendarDate.forEach((week) => {
        week.value.forEach((day) => {
          if (getMonth(day.value) === getMonth(testDate)) {
            expect(day.status).toBe('current');
          }
        });
      });
    });

    it('달력 데이터의 첫 번째 "current" 상태 이전의 모든 날짜는 "prev" 상태여야 한다.', () => {
      const flattenedCalendarDates = monthlyCalendarDate.flatMap((week) => week.value);
      const firstCurrentStatusDateIndex = flattenedCalendarDates.findIndex(
        (day) => day.status === 'current',
      );

      Array.from({ length: firstCurrentStatusDateIndex }, (_, index) => {
        expect(flattenedCalendarDates[index].status).toBe('prev');
      });
    });

    it('달력 데이터의 마지막 "current" 상태 이후의 모든 날짜는 "prev" 상태여야 한다.', () => {
      const reversedFlattenedCalendarDates = monthlyCalendarDate
        .flatMap((week) => week.value)
        .reverse();
      const firstCurrentStatusDateIndex = reversedFlattenedCalendarDates.findIndex(
        (day) => day.status === 'current',
      );

      Array.from({ length: firstCurrentStatusDateIndex }, (_, index) => {
        expect(reversedFlattenedCalendarDates[index].status).toBe('next');
      });
    });
  });
});
