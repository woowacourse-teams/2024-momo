import { useEffect, useState } from 'react';

import { useGetMyScheduleQuery } from '@stores/servers/schedule/queries';

export default function useCalendarPick(uuid: string, userName: string) {
  const { data: meetingSchedules, isSuccess } = useGetMyScheduleQuery(uuid, userName);

  const [selectedDatesObj, setSelectedDatesObj] = useState<Record<string, boolean>>({});
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

  useEffect(() => {
    if (isSuccess) {
      const schedules = Object.fromEntries(
        meetingSchedules.schedules.map(({ date }) => [date, true]),
      );
      setSelectedDatesObj(schedules);
    }
  }, [isSuccess, meetingSchedules]);

  return { selectedDates, hasDate, handleSelectedDate };
}
