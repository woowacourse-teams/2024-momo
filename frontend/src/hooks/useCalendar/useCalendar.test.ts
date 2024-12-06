import { act } from '@testing-library/react';

import renderHookWithProvider from '@hooks/__test__/renderHookWithProvider';

import { getFullDate } from '@utils/date';

import { TOAST_MESSAGES } from '@constants/toasts';

import useCalendar from './useCalendar';

// 테스트 환경에서 useToast를 호출하면 mockAddToast 함수를 호출합니다.(@해리)
const mockAddToast = jest.fn();
jest.mock('@hooks/useToast/useToast', () => ({
  __esModule: true,
  default: () => ({
    addToast: mockAddToast,
  }),
}));

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

      const { result } = renderHookWithProvider(useCalendar);

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

      const { result } = renderHookWithProvider(useCalendar);
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

      const { result } = renderHookWithProvider(useCalendar);
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

      const { result } = renderHookWithProvider(useCalendar);
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

      const { result } = renderHookWithProvider(useCalendar);
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
      const { result } = renderHookWithProvider(useCalendar);
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
      const { result } = renderHookWithProvider(useCalendar);
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

  describe('1년 범위 이동 예외처리', () => {
    const TEST_YEAR = 2024;
    const TEST_MONTH = 9; // 10월
    const TEST_DATE = 4;

    beforeEach(() => {
      jest.setSystemTime(new Date(TEST_YEAR, TEST_MONTH, TEST_DATE));
    });

    it('현재 월 기준, 약속 날짜 범위가 1년을 벗어나면 토스트 UI를 활용하여 사용자에게 예외 피드백을 전달한다', async () => {
      const { result } = renderHookWithProvider(useCalendar);

      // 1년이 12달이므로 moveToNextMonth() 함수를 13반 호출하면 범위를 초과합니다.
      for (let i = 0; i < 13; i++) {
        await act(async () => {
          result.current.view.moveToNextMonth();
        });
      }

      // 1년의 범위가 초과되었을 때, 토스트 메시지가 정상적으로 출력되는지 확인합니다.
      expect(mockAddToast).toHaveBeenCalledWith({
        message: TOAST_MESSAGES.OUT_OF_ONE_YEAR_RANGE,
        type: 'warning',
        duration: 2000,
      });
    });
  });
});
