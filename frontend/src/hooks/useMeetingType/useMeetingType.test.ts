import { renderHook } from '@testing-library/react';
import { act } from 'react';

import useMeetingType from './useMeetingType';

describe('useMeetingType', () => {
  it('isChecked의 기본값은 false입니다.', () => {
    const { result } = renderHook(() => useMeetingType());

    expect(result.current.isChecked).toBe(false);
  });

  it('handleToggleIsChecked 함수를 실행하면 값이 반전됩니다.', () => {
    const { result } = renderHook(() => useMeetingType());

    act(() => {
      result.current.handleToggleIsChecked();
    });

    expect(result.current.isChecked).toBe(true);
  });

  it('isChecked가 false라면 "DATETIME"타입을 갖습니다.', () => {
    const { result } = renderHook(() => useMeetingType());

    expect(result.current.meetingType).toBe('DATETIME');
  });

  it('isChecked가 true라면 "DAYSONLY"타입을 갖습니다.', () => {
    const { result } = renderHook(() => useMeetingType());

    act(() => {
      result.current.handleToggleIsChecked();
    });

    expect(result.current.meetingType).toBe('DAYSONLY');
  });
});
