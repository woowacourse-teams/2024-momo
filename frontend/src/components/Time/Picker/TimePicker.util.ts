import { GetMeetingResponse } from '@apis/getMeeting';

type TimeSlot = Record<string, number>;

const generateTimeSlots = (start: string, end: string) => {
  const startHour = Number(start.split(':')[0]);
  const endHour = Number(end.split(':')[0]);
  const slots: string[] = [];

  for (let i = startHour; i <= endHour; i++) {
    slots.push(`${i.toString().padStart(2, '0') + ':00'}`);
  }

  return slots;
};

export const generateScheduleMatrix = ({
  startTime,
  endTime,
  availableDates,
  schedules,
}: GetMeetingResponse) => {
  const timeSlots = generateTimeSlots(startTime, endTime);
  const timeSlotIndex = timeSlots.reduce((acc, slot, idx) => {
    acc[slot] = idx;
    return acc;
  }, {} as TimeSlot);

  const scheduleMatrix: boolean[][] = Array.from({ length: timeSlots.length }, (): boolean[] =>
    Array(availableDates.length).fill(false),
  );

  schedules.forEach((schedule) => {
    const dateIndex = availableDates.indexOf(schedule.date);

    if (dateIndex !== -1) {
      schedule.times.forEach((time) => {
        const timeIndex = timeSlotIndex[time];

        if (timeIndex !== undefined) {
          scheduleMatrix[timeIndex][dateIndex] = true;
        }
      });
    }
  });

  return scheduleMatrix;
};

export const convertToSchedule = (
  matrix: boolean[][],
  availableDates: string[],
  startTime: string,
  endTime: string,
) => {
  const timeSlots = generateTimeSlots(startTime, endTime);

  const schedules = availableDates.map((date, colIndex) => {
    const times: string[] = [];

    matrix.forEach((row, rowIndex) => {
      if (row[colIndex]) {
        // 임시로 30분 단위도 추가되도록 설정
        times.push(timeSlots[rowIndex]);
        times.push(timeSlots[rowIndex].slice(0, 2) + ':30');
      }
    });

    return { date, times };
  });

  return schedules.filter((schedule) => schedule.times.length > 0);
};
