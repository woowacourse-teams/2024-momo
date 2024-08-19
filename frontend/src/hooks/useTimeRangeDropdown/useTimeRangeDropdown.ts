import { useState } from 'react';

import { INITIAL_END_TIME, INITIAL_START_TIME } from './constants';
import {
  addHoursToCurrentTime,
  generateEndTimeOptions,
  generateStartTimeOptions,
  isTimeSelectable,
} from './useTimeRangeDropdown.utils';

export default function useTimeRangeDropdown() {
  const [startTime, setStartTime] = useState(INITIAL_START_TIME);
  const [endTime, setEndTime] = useState(INITIAL_END_TIME);

  // startTime의 onChange 핸들러 함수
  // startTime을 선택하면 endTime은 (startTime + 1시간)으로 설정됩니다.
  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
    setEndTime(addHoursToCurrentTime(time, 1));
  };

  // endTime의 onChange 핸들러 함수
  // startTime이 endTime보다 빠르다면 startTime이 변경되지 않습니다.
  const handleEndTimeChange = (time: string) => {
    if (!isTimeSelectable(startTime, time)) return;

    setEndTime(time);
  };

  return {
    startTime: {
      value: startTime,
      options: generateStartTimeOptions(),
    },
    endTime: {
      value: endTime,
      options: generateEndTimeOptions(startTime),
    },
    handleStartTimeChange,
    handleEndTimeChange,
  } as const;
}
