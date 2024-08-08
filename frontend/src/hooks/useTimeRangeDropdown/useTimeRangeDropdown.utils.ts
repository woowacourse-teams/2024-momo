import type { Option } from '@components/_common/Dropdown';

import { MAXIMUM_TIME, MINIMUM_TIME } from './constants';

// label에 보여줄 이름을 변환해주는 함수
function formatHours(hour: number) {
  if (hour === 12) return '오후 12';
  if (hour === 24) return '오전 12';

  return hour > 12 ? `오후 ${hour - 12}` : `오전 ${hour}`;
}

// 0시 ~ endTime까지의 시간만 선택 가능한 함수. 시작 시간 options에 사용
export function generateStartTimeOptions(endTime: string) {
  const times: Option[] = [];
  const endHours = Number(endTime.split(':')[0]);

  for (let i = MINIMUM_TIME; i < endHours; i++) {
    const label = formatHours(i);

    times.push({ value: `${String(i).padStart(2, '0')}:00`, label: label + ':00' });
  }

  return times;
}

// startTime + 1시 ~ 24시까지의 시간만 선택 가능한 함수. 시작 시간 options에 사용
export function generateEndTimeOptions(startTime: string) {
  const times: Option[] = [];
  const startHours = Number(startTime.split(':')[0]);

  for (let i = startHours + 1; i <= MAXIMUM_TIME; i++) {
    const label = formatHours(i).padStart(2, '0');

    // 시간상 24시는 존재하지 않기 때문에 백엔드에서 오류가 발생. 따라서 오전 12:00으로 표현하지만, 서버에 00:00으로 전송(@낙타)
    times.push({ value: `${String(i === 24 ? 0 : i).padStart(2, '0')}:00`, label: label + ':00' });
  }

  return times;
}

// 만약 시작 시간보다 끝 시간이 빠르다면 false를 반환하는 함수(@낙타)
export function isTimeSelectable(startTime: string, endTime: string) {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  if (endHours < startHours) return false;
  if (endHours === startHours && endMinutes < startMinutes) return false;

  return true;
}
