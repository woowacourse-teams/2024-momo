import type { MeetingAllSchedules, MeetingSingleSchedule } from '@apis/schedules';

const generateTimeSlots = (start: string, end: string) => {
  const startHour = Number(start.split(':')[0]);
  const endHour = Number(end.split(':')[0]);
  const slots: string[] = [];

  for (let i = startHour; i <= endHour; i++) {
    slots.push(`${i.toString().padStart(2, '0')}:00`);
  }

  return slots;
};

interface GenerateScheduleMatrixProps {
  firstTime: string;
  lastTime: string;
  availableDates: string[];
  meetingSchedules: MeetingAllSchedules | MeetingSingleSchedule;
}

export const generateScheduleMatrix = ({
  firstTime,
  lastTime,
  availableDates,
  meetingSchedules,
}: GenerateScheduleMatrixProps) => {
  const timeSlots = generateTimeSlots(firstTime, lastTime);
  const timeSlotIndex = timeSlots.reduce(
    (acc, slot, idx) => {
      acc[slot] = idx;
      return acc;
    },
    {} as Record<string, number>,
  );

  const scheduleMatrix: number[][] = Array.from({ length: timeSlots.length }, (): number[] =>
    Array(availableDates.length).fill(0),
  );

  if (meetingSchedules) {
    if ('attendeeName' in meetingSchedules) {
      meetingSchedules.schedules.forEach(({ date, times }) => {
        const colIndex = availableDates.indexOf(date);

        if (colIndex !== -1) {
          times.forEach((time) => {
            const rowIndex = timeSlotIndex[time];

            if (rowIndex !== undefined) {
              scheduleMatrix[rowIndex][colIndex] = 1;
            }
          });
        }
      });
    } else {
      meetingSchedules.schedules.forEach(({ date, time, attendeeNames }) => {
        const rowIndex = timeSlotIndex[time];
        const colIndex = availableDates.indexOf(date);

        if (rowIndex !== undefined && colIndex !== -1) {
          scheduleMatrix[rowIndex][colIndex] = attendeeNames.length;
        }
      });
    }
  }

  return scheduleMatrix;
};

export const convertToSchedule = (
  matrix: number[][],
  availableDates: string[],
  startTime: string,
  endTime: string,
) => {
  const timeSlots = generateTimeSlots(startTime, endTime);

  const schedules = availableDates.map((date, colIndex) => {
    const times: string[] = [];

    matrix.forEach((row, rowIndex) => {
      if (row[colIndex]) {
        // 0 or 1
        // 임시로 30분 단위도 추가되도록 설정
        times.push(timeSlots[rowIndex]);
        times.push(timeSlots[rowIndex].slice(0, 2) + ':30');
      }
    });

    return { date, times };
  });

  return schedules.filter((schedule) => schedule.times.length > 0);
};
