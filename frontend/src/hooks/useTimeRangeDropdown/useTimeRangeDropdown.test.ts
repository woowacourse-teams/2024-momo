import { renderHook } from '@testing-library/react';
import { act } from 'react';

import { INITIAL_END_TIME, INITIAL_START_TIME } from './constants';
import useTimeRangeDropdown from './useTimeRangeDropdown';

describe('useTimeRangeDropdown', () => {
  it(`초기 시작 시간(startTime)은 ${INITIAL_START_TIME}, 끝 시간(emdTime)은 ${INITIAL_END_TIME}으로 설정된다.`, () => {
    const { result } = renderHook(() => useTimeRangeDropdown());

    expect(result.current.startTime.value).toBe(INITIAL_START_TIME);
    expect(result.current.endTime.value).toBe(INITIAL_END_TIME);
  });

  it('선택한 끝 시간(endTime)이 시작 시간(startTime)보다 빠르다면 선택한 시간값으로 변경되지 않는다.', () => {
    const CHANGE_START_TIME = '04:00';
    const CHANGE_END_TIME = '01:00';
    const { result } = renderHook(() => useTimeRangeDropdown());

    act(() => {
      result.current.handleStartTimeChange(CHANGE_START_TIME);
    });

    act(() => {
      result.current.handleEndTimeChange(CHANGE_END_TIME);
    });

    expect(result.current.endTime.value).not.toBe(CHANGE_END_TIME);
  });

  it('선택한 끝 시간(endTime)이 시작 시간(startTime)보다 느리다면 선택한 시간값으로 변경된다.', () => {
    const CHANGE_START_TIME = '11:00';
    const CHANGE_END_TIME = '12:00';
    const { result } = renderHook(() => useTimeRangeDropdown());

    act(() => {
      result.current.handleStartTimeChange(CHANGE_START_TIME);
    });

    act(() => {
      result.current.handleEndTimeChange(CHANGE_END_TIME);
    });

    expect(result.current.endTime.value).toBe(CHANGE_END_TIME);
  });

  it.each([
    ['18:00', '19:00'],
    ['06:00', '07:00'],
  ])(
    '시작 시간(startTime)을 선택하면, 끝 시간은 1시간 이후로 자동 설정된다.',
    (startTime, endTime) => {
      const { result } = renderHook(() => useTimeRangeDropdown());

      act(() => {
        result.current.handleStartTimeChange(startTime);
      });

      expect(result.current.endTime.value).toBe(endTime);
    },
  );
});
