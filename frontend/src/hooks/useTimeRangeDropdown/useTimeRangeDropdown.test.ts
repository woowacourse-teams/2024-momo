import { renderHook } from '@testing-library/react';
import { act } from 'react';

import useTimeRangeDropdown from './useTimeRangeDropdown';

describe('useTimeRangeDropdown', () => {
  it('초기 시작 시간(startTime)은 0:00, 끝 시간(emdTime)은 23:00으로 설정된다.', () => {
    const { result } = renderHook(() => useTimeRangeDropdown());

    expect(result.current.startTime).toBe('0:00');
    expect(result.current.endTime).toBe('23:00');
  });

  it('선택한 시작 시간(startTime)이 끝 시간(endTime)보다 느리다면 선택한 시간값으로 변경되지 않는다.', () => {
    const CHANGE_TIME = '1:00';
    const { result } = renderHook(() => useTimeRangeDropdown());

    act(() => {
      result.current.onEndTimeChange('0:00');
    });

    act(() => {
      result.current.onStartTimeChange(CHANGE_TIME);
    });

    expect(result.current.startTime).not.toBe(CHANGE_TIME);
  });

  it('선택한 시작 시간(startTime)이 끝 시간(endTime)보다 빠르다면 값이 선택한 시간값으로 변경된다.', () => {
    const CHANGE_TIME = '1:00';
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
    const CHANGE_TIME = '1:00';
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
      result.current.onStartTimeChange('0:00');
    });

    act(() => {
      result.current.onEndTimeChange(CHANGE_TIME);
    });

    expect(result.current.endTime).toBe(CHANGE_TIME);
  });
});
