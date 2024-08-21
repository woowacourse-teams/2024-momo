import { useMemo } from 'react';

import useDatePage from '@hooks/useDatePage/useDatePage';
import useTimePick from '@hooks/useTimePick/useTimePick';

import { DATES_PER_PAGE } from '@constants/date';

interface UseTimePickReturn {
  tableRef: React.MutableRefObject<HTMLTableElement | null>;
  currentTableValue: number[][];
  tableValue: number[][];
}

type UsePagedTimePickHook = (
  availableDates: string[],
  initialSchedules: number[][],
) => UseTimePickReturn & Omit<ReturnType<typeof useDatePage>, 'resetDatePage'>;

/**
 * usePagedTimePick 훅은 시간 선택 테이블의 상태와 날짜 인덱스를 관리합니다.
 * 약속 날짜가 4일 이상인 경우, 수정할 때 다음 날짜 페이지로 이동할 수 있게 하기 위해서 useDatePage 커스텀 훅과 조합하는 방향으로 구현했습니다.(@해리)
 *
 * @param {string[]} availableDates - 사용할 수 있는 날짜들의 배열
 * @param {number[][]} initialSchedules - 초기 시간표 데이터
 * @returns {UseTimePickReturn & Omit<ReturnType<typeof useDatePage>, 'resetDatePage'>}
 * 시간 선택 테이블과 날짜 페이지네이션을 관리하는 상태와 함수들을 반환합니다.
 * 시간을 선택할 때는, 날짜 페이지를 0으로 초기화할 필요가 없다고 판단해서 Omit을 활용해 반환 타입에서 제거했어요.
 *
 * * 아래는 usePagedTimePick 훅 반환 타입에 대한 간단한 설명입니다. :)
 * @property {React.MutableRefObject<HTMLTableElement | null>} tableRef - 테이블 요소의 참조 객체
 * @property {number[][]} tableValue - 전체 테이블 값
 * @property {number[][]} currentTableValue - 현재 페이지에 해당하는 테이블 값
 * @property {number} currentDatePage - 현재 날짜 페이지 인덱스
 * @property {string[]} currentDates - 현재 페이지에 해당하는 날짜 배열
 * @property {() => void} increaseDatePage - 날짜 페이지를 증가시키는 함수
 * @property {() => void} decreaseDatePage - 날짜 페이지를 감소시키는 함수
 * @property {boolean} isMultiPage - 페이지가 여러 개인지 여부
 * @property {boolean} isFirstPage - 현재 페이지가 첫 페이지인지 여부
 * @property {boolean} isLastPage - 현재 페이지가 마지막 페이지인지 여부
 */

const usePagedTimePick: UsePagedTimePickHook = (availableDates, initialSchedules) => {
  const {
    currentDatePage,
    currentDates,
    increaseDatePage,
    decreaseDatePage,
    isMultiPage,
    isFirstPage,
    isLastPage,
  } = useDatePage(availableDates);

  const { tableRef, tableValue } = useTimePick(initialSchedules, currentDatePage);

  const currentTableValue = useMemo(
    () =>
      tableValue.map((row) =>
        row.slice(currentDatePage * DATES_PER_PAGE, (currentDatePage + 1) * DATES_PER_PAGE),
      ),
    [tableValue, currentDatePage],
  );

  return {
    tableRef,
    tableValue,
    currentTableValue,
    currentDatePage,
    currentDates,
    increaseDatePage,
    decreaseDatePage,
    isMultiPage,
    isFirstPage,
    isLastPage,
  };
};

export default usePagedTimePick;
