import { useCallback, useEffect, useRef, useState } from 'react';

import { getTableCellIndex, isMouseEvent, isTouchEvent } from './useTimePick.utils';

interface TimePickTableIndex {
  rowIndex: number;
  colIndex: number;
}

export default function useTimePick(initialTableValue: number[][], currentDatePage: number = 0) {
  const startIndex = useRef<TimePickTableIndex | null>(null);
  const currentIndex = useRef<TimePickTableIndex | null>(null);
  const initialTable = useRef<number[][]>([]);
  const mode = useRef<number>(0);

  const tableRef = useRef<HTMLTableElement | null>(null);
  const [tableValue, setTableValue] = useState<number[][]>(initialTableValue);

  // 날짜가 4일 이상일 경우 사용자에게 보여지는 인덱스와, 테이블 상태로 관리하는 인덱스가 달라서 해당 함수를 추가로 구현했습니다!
  // > 버튼을 눌러서 다음 날짜 페이지로 이동할 경우, 사용자에게 보여지는 인덱스는 0인데, 실제 상태로 관리해야 하는 인덱스는 사용자에게 보여지는 인덱스 * 3이기 때문입니다.(@해리)
  const getActualIndex = useCallback(
    (index: TimePickTableIndex) => {
      const { rowIndex, colIndex } = index;
      const actualColIndex = colIndex + currentDatePage * 5;
      return { rowIndex, colIndex: actualColIndex };
    },
    [currentDatePage],
  );

  const handleTimePickStart = useCallback(
    (event: Event) => {
      const index = getTableCellIndex(event);

      if (!index) return;
      if (isTouchEvent(event) && event.cancelable) {
        event.preventDefault();
      }

      const actualIndex = getActualIndex(index);
      const { rowIndex, colIndex } = actualIndex;

      initialTable.current = [...tableValue];
      startIndex.current = { rowIndex, colIndex };

      const newTableValues = [...tableValue];

      mode.current = tableValue[rowIndex][colIndex];
      newTableValues[rowIndex][colIndex] = mode.current === 0 ? 1 : 0;

      setTableValue(newTableValues);
    },
    [tableValue, getActualIndex],
  );

  const handlePickedTimeChange = useCallback(
    (event: Event) => {
      if (!startIndex.current) return;
      if (isMouseEvent(event) && event.buttons !== 1) return;

      const index = getTableCellIndex(event);
      if (!index) return;

      const actualIndex = getActualIndex(index);
      const { rowIndex, colIndex } = actualIndex;

      if (currentIndex.current?.rowIndex === rowIndex && currentIndex.current.colIndex === colIndex)
        return;

      currentIndex.current = actualIndex;
      const { rowIndex: startRow, colIndex: startCol } = startIndex.current;
      const { rowIndex: currentRow, colIndex: currentCol } = currentIndex.current;

      const [minRow, maxRow] = [startRow, currentRow].sort((a, b) => a - b);
      const [minCol, maxCol] = [startCol, currentCol].sort((a, b) => a - b);

      const nextTableValue = tableValue.map((row) => [...row]);
      nextTableValue.forEach((row, i) => {
        row.forEach((_, j) => {
          if (i >= minRow && i <= maxRow && j >= minCol && j <= maxCol) {
            nextTableValue[i][j] = mode.current === 0 ? 1 : 0;
          } else {
            nextTableValue[i][j] = initialTable.current[i][j];
          }
        });
      });

      setTableValue(nextTableValue);
    },
    [tableValue, getActualIndex],
  );

  const handlePointerEnd = useCallback((event: Event) => {
    startIndex.current = null;
    if (event.cancelable) {
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    const node = tableRef.current?.querySelector('tbody') ?? tableRef.current;

    if (!node) {
      return;
    }

    node.addEventListener('mousedown', handleTimePickStart);
    node.addEventListener('touchstart', handleTimePickStart);
    node.addEventListener('mouseover', handlePickedTimeChange);
    node.addEventListener('touchmove', handlePickedTimeChange);
    node.addEventListener('mouseup', handlePointerEnd);
    node.addEventListener('touchend', handlePointerEnd);

    return () => {
      node.removeEventListener('mousedown', handleTimePickStart);
      node.removeEventListener('touchstart', handleTimePickStart);
      node.removeEventListener('mouseover', handlePickedTimeChange);
      node.removeEventListener('touchmove', handlePickedTimeChange);
      node.removeEventListener('mouseup', handlePointerEnd);
      node.removeEventListener('touchend', handlePointerEnd);
    };
  }, [handleTimePickStart, handlePickedTimeChange, handlePointerEnd]);

  return { tableRef, tableValue } as const;
}
