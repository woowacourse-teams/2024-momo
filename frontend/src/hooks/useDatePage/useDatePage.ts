import { useState } from 'react';

import { DATES_PER_PAGE } from '@constants/date';

interface UseDatePageReturn {
  currentDatePage: number;
  currentDates: string[];
  increaseDatePage: () => void;
  decreaseDatePage: () => void;
  resetDatePage: () => void;
  isMultiPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
}

type UseDatePageHook = (availableDates: string[]) => UseDatePageReturn;

/**
 * useDatePage 훅은 주어진 날짜 배열을 페이지 단위로 나누어 관리합니다.
 * 날짜가 4일 이상인 경우, 현재 저희 서비스의 정책인 3일 단위로 나누어서 날짜를 페이지네이션 책임을 가지고 있습니다.(@해리)
 *
 * @param {string[]} availableDates - 사용할 수 있는 날짜들의 배열
 * @returns {UseDatePageReturn}
 *
 * 아래는 useDatePage 훅 반환 타입에 대한 간단한 설명입니다. :)
 * @property {number} currentDatePage - 현재 페이지 번호
 * @property {string[]} currentDates - 현재 페이지에 해당하는 날짜 배열
 * @property {() => void} increaseDatePage - 페이지를 증가시키는 함수
 * @property {() => void} decreaseDatePage - 페이지를 감소시키는 함수
 * @property {() => void} resetDatePage - 페이지를 초기화하는 함수
 * @property {boolean} isMultiPage - 페이지가 여러 개인지 여부, 만약 페이지가 여러개가 아니라면 컴포넌트에서 날짜 페이지네이션 위한 컴포넌트를 렌더링하지 않기 위해 사용할 수 있습니다.
 * @property {boolean} isFirstPage - 현재 페이지가 첫 페이지인지 여부
 * @property {boolean} isLastPage - 현재 페이지가 마지막 페이지인지 여부
 */

const useDatePage: UseDatePageHook = (availableDates) => {
  const [currentDatePage, setCurrentDatePage] = useState(0);

  const totalPages = Math.ceil(availableDates.length / DATES_PER_PAGE);
  const currentDates = availableDates.slice(
    currentDatePage * DATES_PER_PAGE,
    (currentDatePage + 1) * DATES_PER_PAGE,
  );

  const increaseDatePage = () => {
    setCurrentDatePage((prev) => prev + 1);
  };

  const decreaseDatePage = () => {
    setCurrentDatePage((prev) => prev - 1);
  };

  const resetDatePage = () => {
    setCurrentDatePage(0);
  };

  const isMultiPage = totalPages > 1;
  const isFirstPage = currentDatePage === 0;
  const isLastPage = currentDatePage === totalPages - 1;

  return {
    currentDatePage,
    currentDates,
    increaseDatePage,
    decreaseDatePage,
    resetDatePage,
    isMultiPage,
    isFirstPage,
    isLastPage,
  };
};

export default useDatePage;
