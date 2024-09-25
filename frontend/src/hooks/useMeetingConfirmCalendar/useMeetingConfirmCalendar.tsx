import { useState } from 'react';
import type { MeetingAllSchedulesItem } from 'types/schedule';

export default function useMeetingConfirmCalendar(schedules: MeetingAllSchedulesItem[]) {
  const initialSchedules = Object.fromEntries(schedules.map(({ date }) => [date, true]));
  const [selectedDatesObj, setSelectedDatesObj] =
    useState<Record<string, boolean>>(initialSchedules);
  const selectedDates = Object.keys(selectedDatesObj);

  const handleSelectedDate = (date: string) => {
    const copiedSelectedDatesObj = { ...selectedDatesObj };

    if (selectedDatesObj[date]) delete copiedSelectedDatesObj[date];
    else copiedSelectedDatesObj[date] = true;

    setSelectedDatesObj({ ...copiedSelectedDatesObj });
  };

  const hasDate = (date: string) => {
    return !!selectedDatesObj[date];
  };

  return { selectedDates, hasDate, handleSelectedDate };
}
