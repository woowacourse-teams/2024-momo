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
