import type { MeetingDateTime } from 'types/meeting';
import type {
  MeetingAllSchedules,
  MeetingSingeScheduleItem,
  MeetingSingleSchedule,
} from 'types/schedule';
import type { TooltipPosition } from 'types/tooltip';

export const formatDate = (dateString: string) => {
  const currentDateObj = new Date(dateString);
  const currentMonth = currentDateObj.getMonth() + 1;
  const currentDay = currentDateObj.getDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][currentDateObj.getDay()];

  return {
    dayOfWeek,
    monthDate: `${currentMonth}/${currentDay}`,
  } as const;
};

export const formatTime = (time: string) => {
  const hour = parseInt(time);
  const hourPrefix = hour >= 12 ? '오후' : '오전';

  return `${hourPrefix} ${hour % 12 || 12}시`;
};

export const generateTimeRange = (firstTime: string, lastTime: string): number[] => {
  const start = parseInt(firstTime.slice(0, 2));
  const end = parseInt(lastTime.slice(0, 2));

  return Array.from({ length: end - start }, (_, index) => {
    const hour = start + index;
    return hour;
  });
};

/**
 * 주어진 시작 시간과 종료 시간 사이의 시간 슬롯을 "HH:00" 형식으로 생성합니다.
 *
 * @param {string} startTime - 시작 시간 ("HH:MM" 형식).
 * @param {string} endTime - 종료 시간 ("HH:MM" 형식).
 * @returns {string[]} "HH:00" 형식의 시간 슬롯 배열.
 *
 * @example 아래는 해당 함수를 사용할 때, 인자와 반환값에 대한 예시입니다 :)
 * generateTimeSlots("09:00", "12:00");
 * -> ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"]
 */
const generateTimeSlots = (startTime: string, endTime: string): string[] => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const totalSlots = (endHour * 60 + endMinute - (startHour * 60 + startMinute)) / 30;

  return Array.from({ length: totalSlots }, (_, index) => {
    const minutesFromStart = index * 30;
    const hour = Math.floor((startHour * 60 + startMinute + minutesFromStart) / 60);
    const minute = (startMinute + minutesFromStart) % 60;

    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });
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

interface GenerateAllScheduleTableArgs extends MeetingDateTime {
  meetingAllSchedules: MeetingAllSchedules;
}

export const generateAllScheduleTable = ({
  firstTime,
  lastTime,
  availableDates,
  meetingAllSchedules,
}: GenerateAllScheduleTableArgs) => {
  const timeSlots = generateTimeSlots(firstTime, lastTime);
  const timeSlotIndex = generateTimeSlotIndex(timeSlots);

  const allScheduleTable: string[][][] = Array.from({ length: timeSlots.length }, (): string[][] =>
    Array(availableDates.length).fill([]),
  );

  meetingAllSchedules.schedules.forEach(({ date, time, attendeeNames }) => {
    const rowIndex = timeSlotIndex[time];
    const colIndex = availableDates.indexOf(date);

    if (rowIndex !== undefined && colIndex !== -1) {
      allScheduleTable[rowIndex][colIndex] = attendeeNames;
    }
  });

  return allScheduleTable;
};

interface GenerateSingleScheduleTableArgs extends MeetingDateTime {
  meetingSingleSchedule: MeetingSingleSchedule;
}

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

      if (rowIndex) {
        singleScheduleTable[rowIndex][colIndex] = 1;
      }
    });
  });

  return singleScheduleTable;
};

export const convertToSchedule = (
  selectedScheduleTable: number[][],
  availableDates: string[],
  startTime: string,
  endTime: string,
): MeetingSingeScheduleItem[] => {
  const timeSlots = generateTimeSlots(startTime, endTime);
  const schedules = availableDates.map((date, colIndex) => {
    const times: string[] = [];

    selectedScheduleTable.forEach((row, rowIndex) => {
      if (row[colIndex]) {
        times.push(timeSlots[rowIndex]);
      }
    });

    return { date, times };
  });

  return schedules.filter((schedule) => schedule.times.length > 0);
};

export const getTooltipPosition = (
  rowIndex: number,
  columnIndex: number,
  totalRows: number,
  totalColumns: number,
): TooltipPosition => {
  if (rowIndex === 0 && columnIndex === 0) return 'bottomRight';
  if (rowIndex === 0 && columnIndex === totalColumns - 1) return 'bottomLeft';
  if (rowIndex === totalRows - 1 && columnIndex === 0) return 'topRight';
  if (rowIndex === totalRows - 1 && columnIndex === totalColumns - 1) return 'topLeft';
  if (rowIndex === 0) return 'bottom';
  if (rowIndex === totalRows - 1) return 'top';
  if (columnIndex === 0) return 'right';
  if (columnIndex === totalColumns - 1) return 'left';
  return 'top';
};
