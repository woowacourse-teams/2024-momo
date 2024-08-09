import type { MeetingAllSchedules } from '@apis/schedules';

export const findAttendeeNames = (
  allSchedules: MeetingAllSchedules,
  availableDates: string[],
  columnIndex: number,
  rowIndex: number,
  firstTime: string,
): string[] => {
  const targetDate = availableDates[columnIndex];
  const targetTime = `${rowIndex + parseInt(firstTime.slice(0, 2))}:00`;

  const formattedTargetTime =
    parseInt(targetTime.split(':')[0]) < 10 ? `0${targetTime}` : targetTime;

  const schedule = allSchedules.schedules.find(
    (s) => s.date === targetDate && s.time === formattedTargetTime,
  );

  return schedule ? schedule.attendeeNames : [];
};
