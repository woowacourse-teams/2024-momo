import { useState } from 'react';

import { compareTimes } from './useTimeRangeDropdown.utils';

const INITIAL_START_TIME = '0:00';
const INITIAL_END_TIME = '23:00';

export default function useTimeRangeDropdown() {
  const [startTime, setStartTime] = useState(INITIAL_START_TIME);
  const [endTime, setEndTime] = useState(INITIAL_END_TIME);

  // 시작 시간이 끝 시간보다 빠르다면 startTime이 변경되지 않도록 설정
  const handleStartTimeChange = (time: string) => {
    if (!compareTimes(time, endTime)) return;

    setStartTime(time);
  };

  // 시작 시간이 끝 시간보다 빠르다면 startTime이 변경되지 않도록 설정
  const handleEndTimeChange = (time: string) => {
    if (!compareTimes(startTime, time)) return;

    setEndTime(time);
  };

  return {
    startTime,
    endTime,
    onStartTimeChange: handleStartTimeChange,
    onEndTimeChange: handleEndTimeChange,
  } as const;
}
