import { renderHook } from '@testing-library/react';
import { act } from 'react';

import { INITIAL_END_TIME, INITIAL_START_TIME } from './constants';
import useTimeRangeDropdown from './useTimeRangeDropdown';

describe('useTimeRangeDropdown', () => {
  it(`초기 시작 시간(startTime)은 ${INITIAL_START_TIME}, 끝 시간(emdTime)은 ${INITIAL_END_TIME}으로 설정된다.`, () => {
    const { result } = renderHook(() => useTimeRangeDropdown());

    expect(result.current.startTime).toBe(INITIAL_START_TIME);
    expect(result.current.endTime).toBe(INITIAL_END_TIME);
  });

  it('선택한 시작 시간(startTime)이 끝 시간(endTime)보다 느리다면 선택한 시간값으로 변경되지 않는다.', () => {
    const CHANGE_TIME = '01:00';
    const { result } = renderHook(() => useTimeRangeDropdown());

    act(() => {
      result.current.onEndTimeChange('00:00');
    });

    act(() => {
      result.current.onStartTimeChange(CHANGE_TIME);
    });

    expect(result.current.startTime).not.toBe(CHANGE_TIME);
  });

  it('선택한 시작 시간(startTime)이 끝 시간(endTime)보다 빠르다면 값이 선택한 시간값으로 변경된다.', () => {
    const CHANGE_TIME = '01:00';
    const { result } = renderHook(() => useTimeRangeDropdown());

    act(() => {
      result.current.onEndTimeChange('23:00');
    });

    act(() => {
      result.current.onStartTimeChange(CHANGE_TIME);
    });

    expect(result.current.startTime).toBe(CHANGE_TIME);
  });

  it('선택한 끝 시간(endTime)이 시작 시간(startTime)보다 빠르다면 선택한 시간값으로 변경되지 않는다.', () => {
    const CHANGE_TIME = '01:00';
    const { result } = renderHook(() => useTimeRangeDropdown());

    act(() => {
      result.current.onStartTimeChange('12:00');
    });

    act(() => {
      result.current.onEndTimeChange(CHANGE_TIME);
    });

    expect(result.current.endTime).not.toBe(CHANGE_TIME);
  });

  it('선택한 끝 시간(endTime)이 시작 시간(startTime)보다 느리다면 선택한 시간값으로 변경된다.', () => {
    const CHANGE_TIME = '12:00';
    const { result } = renderHook(() => useTimeRangeDropdown());

    act(() => {
      result.current.onStartTimeChange('00:00');
    });

    act(() => {
      result.current.onEndTimeChange(CHANGE_TIME);
    });

    expect(result.current.endTime).toBe(CHANGE_TIME);
  });
});
