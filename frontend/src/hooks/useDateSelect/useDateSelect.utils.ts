import { getFullDate } from '@utils/date';

/**
 * 주어진 시작 날짜와 끝 날짜 사이의 모든 날짜를 'YYYY-MM-DD' 형식의 문자열 배열로 반환.
 * 시작 날짜와 끝 날짜를 포함하여 날짜 범위를 계산.
 *
 * @param {Date} start - 범위의 시작 날짜 (포함).
 * @param {Date} end - 범위의 끝 날짜 (포함).
 *
 * @returns {string[]} 'YYYY-MM-DD' 형식의 날짜 문자열 배열. 시작 날짜부터 끝 날짜까지의 모든 날짜가 포함.
 *
 * 동작 과정:
 * 1. `getTime()`을 사용하여 시작 날짜와 끝 날짜 사이의 일 수를 계산합니다.
 *    - 시작 날짜의 시간과 끝 날짜의 시간을 빼면 두 날짜 사이의 시간 차이를 밀리초 단위로 구할 수 있다.
 *    - `1000 * 60 * 60 * 24`로 나누어 밀리초를 일 단위로 변환한다.
 *    - `Math.ceil`을 사용하여 소수점 이하의 값을 올림 처리하고, 범위에 끝 날짜까지 포함하기 위해 `+1`을 더한다.
 *
 * 2. `Array.from`을 사용하여 계산된 일 수만큼 배열을 생성하고, 각 인덱스에 해당하는 날짜를 계산하여 배열에 추가합니다.
 *    - 각 날짜는 시작 날짜에 인덱스를 더해 생성되며, getFullDate 함수를 사용하여 'YYYY-MM-DD' 형식으로 변환됩니다.
 *
 * 예시:
 * ```ts
 * const start = new Date('2023-09-01');
 * const end = new Date('2023-09-03');
 * 출력: ['2023-09-01', '2023-09-02', '2023-09-03']
 * ```
 */
export const getDatesInRange = (start: Date, end: Date): string[] => {
  const daysBetween = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  return Array.from({ length: daysBetween }, (_, index) => {
    const date = new Date(start);
    date.setDate(date.getDate() + index);

    return getFullDate(date);
  });
};
