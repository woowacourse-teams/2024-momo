import { useState } from 'react';

import useDatePage from '@hooks/useDatePage/useDatePage';

interface UseSelectScheduleReturn {
  currentDates: string[];
  increaseDatePage: () => void;
  decreaseDatePage: () => void;
  isMultiPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  selectedAttendee: string;
  handleAttendeeChange: (attendee: string) => void;
}

type UseSelectScheduleHook = (availableDates: string[]) => UseSelectScheduleReturn;

/**
 * useSelectSchedule 훅은 날짜 페이지와 선택된 참석자를 관리합니다.
 * AllSchedule 컴포넌트에서는 각 약속 참여자 별로, 날짜 별로 약속 현황을 조회할 수 있기 때문에 useDatePage 훅과 조합하는 방향으로 구현했습니다.(@해리)
 *
 * @param {string[]} availableDates - 사용할 수 있는 날짜들의 배열
 * @returns {UseSelectScheduleReturn}
 *
 * * 아래는 useSelectSchedule 훅 반환 타입에 대한 간단한 설명입니다. :)
 * @property {string[]} currentDates - 현재 페이지에 해당하는 날짜 배열
 * @property {() => void} increaseDatePage - 페이지를 증가시키는 함수
 * @property {() => void} decreaseDatePage - 페이지를 감소시키는 함수
 * @property {boolean} isMultiPage - 페이지가 여러 개인지 여부
 * @property {boolean} isFirstPage - 현재 페이지가 첫 페이지인지 여부
 * @property {boolean} isLastPage - 현재 페이지가 마지막 페이지인지 여부
 * @property {string} selectedAttendee - 선택된 참석자의 이름
 * @property {(attendee: string) => void} handleAttendeeChange - 참석자를 변경하는 함수
 */

const useSelectSchedule: UseSelectScheduleHook = (availableDates) => {
  const [selectedAttendee, setSelectedAttendee] = useState('');

  const {
    currentDates,
    increaseDatePage,
    decreaseDatePage,
    resetDatePage,
    isMultiPage,
    isFirstPage,
    isLastPage,
  } = useDatePage(availableDates);

  const handleAttendeeChange = (attendee: string) => {
    if (selectedAttendee === attendee) return;

    setSelectedAttendee(attendee);
    resetDatePage(); // 참여자를 변경할 때마다 페이지를 다시 0으로 초기화해 줍니다.(@해리)
  };

  return {
    currentDates,
    increaseDatePage,
    decreaseDatePage,
    isMultiPage,
    isFirstPage,
    isLastPage,
    selectedAttendee,
    handleAttendeeChange,
  };
};

export default useSelectSchedule;
