import type { MeetingDateTime } from 'types/meeting';
import type {
  MeetingAllSchedules,
  MeetingSingeScheduleItem,
  MeetingSingleSchedule,
} from 'types/schedule';

interface GenerateAllScheduleTableArgs extends MeetingDateTime {
  meetingAllSchedules: MeetingAllSchedules;
}

interface GenerateSingleScheduleTableArgs extends MeetingDateTime {
  meetingSingleSchedule: MeetingSingleSchedule;
}

/**
 * 주어진 시작 시간과 종료 시간 사이의 시간 슬롯을 "HH:00" 형식으로 생성합니다.
 *
 * @param {string} startTime - 시작 시간 ("HH:MM" 형식).
 * @param {string} endTime - 종료 시간 ("HH:MM" 형식).
 * @returns {string[]} "HH:00" 형식의 시간 슬롯 배열.
 *
 * @example 아래는 해당 함수를 사용할 때, 인자와 반환값에 대한 예시입니다 :)
 * generateTimeSlots("09:00", "12:00");
 * -> ["09:00", "10:00", "11:00"]
 */
const generateTimeSlots = (startTime: string, endTime: string): string[] => {
  const startHour = Number(startTime.split(':')[0]);
  const endHour = Number(endTime.split(':')[0]);

  return Array.from(
    { length: endHour - startHour },
    (_, currentHour) => `${(startHour + currentHour).toString().padStart(2, '0')}:00`,
  );
};

/**
 * 주어진 시간 슬롯 배열에서 각 시간 슬롯에 해당하는 인덱스를 매핑한 객체를 생성합니다.
 *
 * @param {string[]} timeSlots - "HH:00" 형식의 시간 슬롯 배열.
 * @returns {Record<string, number>} 각 시간 슬롯을 키로, 해당 슬롯의 인덱스를 값으로 가지는 객체.
 *
 * @example
 * const timeSlots = ["09:00", "10:00", "11:00"];
 * const timeSlotIndex = generateTimeSlotIndex(timeSlots);
 * -> { "09:00": 0, "10:00": 1, "11:00": 2 }
 */
const generateTimeSlotIndex = (timeSlots: string[]): Record<string, number> => {
  const timeSlotIndex = timeSlots.reduce(
    (accTimeSlotIndex, currentTimeSlot, index) => {
      accTimeSlotIndex[currentTimeSlot] = index;
      return accTimeSlotIndex;
    },
    {} as Record<string, number>,
  );

  return timeSlotIndex;
};

export const generateAllScheduleTable = ({
  firstTime,
  lastTime,
  availableDates,
  meetingAllSchedules,
}: GenerateAllScheduleTableArgs) => {
  const timeSlots = generateTimeSlots(firstTime, lastTime);
  const timeSlotIndex = generateTimeSlotIndex(timeSlots);
  const allScheduleTable: number[][] = Array.from({ length: timeSlots.length }, (): number[] =>
    Array(availableDates.length).fill(0),
  );

  meetingAllSchedules.schedules.forEach(({ date, time, attendeeNames }) => {
    const rowIndex = timeSlotIndex[time];
    const colIndex = availableDates.indexOf(date);

    allScheduleTable[rowIndex][colIndex] = attendeeNames.length;
  });

  return allScheduleTable;
};

export const generateSingleScheduleTable = ({
  firstTime,
  lastTime,
  availableDates,
  meetingSingleSchedule,
}: GenerateSingleScheduleTableArgs) => {
  const timeSlots = generateTimeSlots(firstTime, lastTime);
  const timeSlotIndex = generateTimeSlotIndex(timeSlots);
  const singleScheduleTable: number[][] = Array.from({ length: timeSlots.length }, (): number[] =>
    Array(availableDates.length).fill(0),
  );

  meetingSingleSchedule.schedules.forEach(({ date, times }) => {
    const colIndex = availableDates.indexOf(date);

    times.forEach((time) => {
      const rowIndex = timeSlotIndex[time];

      singleScheduleTable[rowIndex][colIndex] = 1;
    });
  });

  return singleScheduleTable;
};

export const convertToSchedule = (
  matrix: number[][],
  availableDates: string[],
  startTime: string,
  endTime: string,
): MeetingSingeScheduleItem[] => {
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
