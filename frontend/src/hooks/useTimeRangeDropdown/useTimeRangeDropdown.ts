import { useState } from 'react';

import { INITIAL_END_TIME, INITIAL_START_TIME } from './constants';
import { isTimeSelectable } from './useTimeRangeDropdown.utils';

export default function useTimeRangeDropdown() {
  const [startTime, setStartTime] = useState(INITIAL_START_TIME);
  const [endTime, setEndTime] = useState(INITIAL_END_TIME);

  // 시작 시간이 끝 시간보다 빠르다면 startTime이 변경되지 않도록 설정
  const handleStartTimeChange = (time: string) => {
    if (!isTimeSelectable(time, endTime)) return;

    setStartTime(time);
  };

  // 시작 시간이 끝 시간보다 빠르다면 startTime이 변경되지 않도록 설정
  const handleEndTimeChange = (time: string) => {
    if (!isTimeSelectable(startTime, time)) return;

    setEndTime(time);
  };

  return {
    startTime,
    endTime,
    onStartTimeChange: handleStartTimeChange,
    onEndTimeChange: handleEndTimeChange,
  } as const;
}
