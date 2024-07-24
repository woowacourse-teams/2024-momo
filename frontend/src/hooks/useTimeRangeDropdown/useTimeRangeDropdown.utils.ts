import type { Option } from '@components/_common/Dropdown';

const MINIMUM_TIME = 0;
const MAXIMUM_TIME = 23;


// label에 보여줄 이름을 변환해주는 함수
function formatHours(hour: number) {
  return hour >= 12 ? `오후 ${hour - 12}` : `오전 ${hour}`;
}

// 0시 ~ 23시 30분까지 30분 단위로 시간 선택 옵션 배열 생성 함수(@낙타)
export function generateTimeOptions() {
  const times: Option[] = [];

  for (let i = MINIMUM_TIME; i <= MAXIMUM_TIME; i++) {
    const label = formatHours(i);

    times.push({ value: `${i}:00`, label: label + ':00' });
    times.push({ value: `${i}:30`, label: label + ':30' });
  }

  return times;
}

// 만약 시작 시간보다 끝 시간이 빠르다면 false를 반환하는 함수(@낙타)
export function compareTimes(startTime: string, endTime: string) {
  const [startHours, startMinutes] = startTime.split(':');
  const [endHours, endMinutes] = endTime.split(':');

  if (endHours < startHours) return false;
  else if (endHours === startHours && endMinutes < startMinutes) return false;

  return true;
}
