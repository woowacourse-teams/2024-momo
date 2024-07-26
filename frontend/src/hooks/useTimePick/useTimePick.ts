import { useCallback, useEffect, useRef, useState } from 'react';

import { getTableCellIndex, isMouseEvent, isTouchEvent } from './useTimePick.utils';

interface TimePickTableIndex {
  rowIndex: number;
  colIndex: number;
}

export default function useTimePick(isUpdate: boolean, initialTableValue: number[][]) {
  const startIndex = useRef<TimePickTableIndex | null>(null);
  const currentIndex = useRef<TimePickTableIndex | null>(null);
  const initialTable = useRef<number[][]>([]);
  const mode = useRef<number>(0);

  const tableRef = useRef<HTMLTableElement | null>(null);
  const [tableValue, setTableValue] = useState<number[][]>(initialTableValue);

  const handleTimePickStart = useCallback(
    (event: Event) => {
      const index = getTableCellIndex(event);

      if (!index) return;

      if (isTouchEvent(event) && event.cancelable) {
        event.preventDefault();
      }

      const { rowIndex, colIndex } = index;

      initialTable.current = [...tableValue];
      startIndex.current = { rowIndex, colIndex };

      const newTableValues = [...tableValue];

      mode.current = tableValue[rowIndex][colIndex];
      newTableValues[rowIndex][colIndex] = mode.current === 0 ? 1 : 0;

      setTableValue(newTableValues);
    },
    [tableValue],
  );

  const handlePickedTimeChange = useCallback(
    (event: Event) => {
      if (!startIndex.current) return;
      if (isMouseEvent(event) && event.buttons !== 1) return;

      const index = getTableCellIndex(event);
      if (!index) return;

      const { rowIndex, colIndex } = index;
      if (currentIndex.current?.rowIndex === rowIndex && currentIndex.current.colIndex === colIndex)
        return;

      currentIndex.current = index;
      const { rowIndex: startRow, colIndex: startCol } = startIndex.current;
      const { rowIndex: currentRow, colIndex: currentCol } = currentIndex.current;

      const [minRow, maxRow] = [startRow, currentRow].sort((a, b) => a - b);
      const [minCol, maxCol] = [startCol, currentCol].sort((a, b) => a - b);

      const nextTableValue = tableValue.map((row) => [...row]);
      nextTableValue.forEach((row, i) => {
        row.forEach((_, j) => {
          if (i < minRow || i > maxRow || j < minCol || j > maxCol) {
            nextTableValue[i][j] = initialTable.current[i][j];
          } else {
            nextTableValue[i][j] = mode.current === 0 ? 1 : 0;
          }
        });
      });

      setTableValue(nextTableValue);
    },
    [tableValue],
  );

  const handlePointerEnd = useCallback((event: Event) => {
    startIndex.current = null;
    if (event.cancelable) {
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    const node = tableRef.current?.querySelector('tbody') ?? tableRef.current;

    if (!node || !isUpdate) {
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
  }, [handleTimePickStart, handlePickedTimeChange, handlePointerEnd, isUpdate]);

  return [tableRef, tableValue] as const;
}
