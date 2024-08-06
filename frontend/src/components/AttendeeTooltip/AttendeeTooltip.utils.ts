import type { MeetingAllSchedules } from '@apis/schedules';

export const findAttendeeNames = (
  allSchedules: MeetingAllSchedules,
  availableDates: string[],
  columnIndex: number,
  rowIndex: number,
  firstTime: string,
): string[] => {
  const schedule = allSchedules.schedules.find(
    (s) =>
      s.date === availableDates[columnIndex] &&
      s.time === `${rowIndex + parseInt(firstTime.slice(0, 2))}:00`,
  );

  return schedule ? schedule.attendeeNames : [];
};
