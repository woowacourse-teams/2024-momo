import { renderHook } from '@testing-library/react';
import { act } from 'react';

import { getFullDate } from '@utils/date';

import useCalendar from './useCalendar';

describe('useCalendar', () => {
  const TEST_YEAR = 2024;
  const TEST_MONTH = 9;
  const TEST_DATE = 4;
  const FIRST_MONTH_INDEX = 0;
  const LAST_MONTH_INDEX = 11;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('현재 달력 데이터 계산', () => {
    it('현재 년도, 월을 올바르게 계산해서 반환한다.', () => {
      jest.setSystemTime(new Date(TEST_YEAR, TEST_MONTH, TEST_DATE));

      const { result } = renderHook(() => useCalendar());

      const { headers, isCurrentMonth } = result.current;
      const { currentYear, currentMonth } = headers;

      expect(currentYear).toBe(TEST_YEAR);
      expect(currentMonth).toBe(TEST_MONTH);
      expect(isCurrentMonth).toBeTruthy();
    });
  });

  describe('달력 년도 이동 기능', () => {
    it('12월에서 다음 달로 이동하면 다음 년도로 변경되어야 한다.', () => {
      jest.setSystemTime(new Date(TEST_YEAR, LAST_MONTH_INDEX, TEST_DATE));

      const { result } = renderHook(() => useCalendar());
      const { view } = result.current;
      const { moveToNextMonth } = view;

      act(() => {
        moveToNextMonth();
      });

      const { headers, isCurrentMonth } = result.current;
      const { currentYear, currentMonth } = headers;

      expect(currentYear).toBe(TEST_YEAR + 1);
      expect(currentMonth).toBe(FIRST_MONTH_INDEX);
      expect(isCurrentMonth).toBeFalsy();
    });

    it('1월에서 이전 년도로 이동하면 이전 년도로 변경되어야 한다.', () => {
      jest.setSystemTime(new Date(TEST_YEAR, FIRST_MONTH_INDEX, TEST_DATE));

      const { result } = renderHook(() => useCalendar());
      const { view } = result.current;
      const { moveToPrevMonth } = view;

      act(() => {
        moveToPrevMonth();
      });

      const { headers, isCurrentMonth } = result.current;
      const { currentYear, currentMonth } = headers;

      expect(currentYear).toBe(TEST_YEAR - 1);
      expect(currentMonth).toBe(LAST_MONTH_INDEX);
      expect(isCurrentMonth).toBeFalsy();
    });
  });

  describe('달력 월 이동 기능', () => {
    it('이전 달로 이동하면, 달 데이터가 변경되어야 한다.', () => {
      jest.setSystemTime(new Date(TEST_YEAR, TEST_MONTH, TEST_DATE));

      const { result } = renderHook(() => useCalendar());
      const { view } = result.current;
      const { moveToPrevMonth } = view;

      act(() => {
        moveToPrevMonth();
      });

      const { headers, isCurrentMonth } = result.current;
      const { currentYear, currentMonth } = headers;

      expect(currentYear).toBe(TEST_YEAR);
      expect(currentMonth).toBe(TEST_MONTH - 1);
      expect(isCurrentMonth).toBeFalsy();
    });

    it('다음 달로 이동하면 달 데이터가 변경되어야 한다..', () => {
      jest.setSystemTime(new Date(TEST_YEAR, TEST_MONTH, TEST_DATE));

      const { result } = renderHook(() => useCalendar());
      const { view } = result.current;
      const { moveToNextMonth } = view;

      act(() => {
        moveToNextMonth();
      });

      const { headers, isCurrentMonth } = result.current;
      const { currentYear, currentMonth } = headers;

      expect(currentYear).toBe(TEST_YEAR);
      expect(currentMonth).toBe(TEST_MONTH + 1);
      expect(isCurrentMonth).toBeFalsy();
    });
  });

  describe('월 이동 시, 변경된 달력 데이터 계산', () => {
    it('현재 달의 마지막 주에 있는 current 상태의 날짜들이 다음 달로 이동했을 때 prev 상태로 변경되어야 한다.', () => {
      const { result } = renderHook(() => useCalendar());
      const {
        body: { value: initialCalendarData },
        view: { moveToNextMonth },
      } = result.current;
      const lastWeekOfCurrentMonth = initialCalendarData[initialCalendarData.length - 1].value;
      const currentDatesInLastWeek = lastWeekOfCurrentMonth.filter(
        (day) => day.status === 'current',
      );

      act(() => {
        moveToNextMonth();
      });

      const {
        body: { value: updatedCalendarData },
      } = result.current;
      const firstWeekOfNextMonth = updatedCalendarData[0].value;
      const prevDatesInFirstWeek = firstWeekOfNextMonth.filter((day) => day.status === 'prev');

      expect(prevDatesInFirstWeek.length).toBe(currentDatesInLastWeek.length);
      currentDatesInLastWeek.forEach((date, index) => {
        expect(getFullDate(prevDatesInFirstWeek[index].value)).toBe(getFullDate(date.value));
        expect(prevDatesInFirstWeek[index].status).toBe('prev');
      });
    });

    it('현재 달의 첫 주에 있는 current 상태의 날짜들이 이전 달로 이동했을 때 next 상태로 변경되어야 한다.', () => {
      const { result } = renderHook(() => useCalendar());
      const {
        body: { value: initialCalendarData },
        view: { moveToPrevMonth },
      } = result.current;
      const firstWeekOfCurrentMonth = initialCalendarData[0].value;
      const currentDatesInFirstWeek = firstWeekOfCurrentMonth.filter(
        (day) => day.status === 'current',
      );

      act(() => {
        moveToPrevMonth();
      });

      const {
        body: { value: updatedCalendarData },
      } = result.current;
      const lastWeekOfPrevMonth = updatedCalendarData[updatedCalendarData.length - 1].value;
      const nextDatesInLastWeek = lastWeekOfPrevMonth.filter((day) => day.status === 'next');

      expect(nextDatesInLastWeek.length).toBe(currentDatesInFirstWeek.length);
      currentDatesInFirstWeek.forEach((date, index) => {
        expect(getFullDate(nextDatesInLastWeek[index].value)).toBe(getFullDate(date.value));
        expect(nextDatesInLastWeek[index].status).toBe('next');
      });
    });
  });
});
