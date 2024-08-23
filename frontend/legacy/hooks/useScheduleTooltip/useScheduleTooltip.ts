import { useCallback, useEffect, useRef, useState } from 'react';
import type { MeetingAllSchedules } from 'types/meeting';

interface ScheduleToolTipState {
  isVisible: boolean;
  targetRect: DOMRect | null;
  attendees: string[];
}

const useScheduleTooltip = (
  availableDates: string[],
  firstTime: string,
  allSchedules: MeetingAllSchedules,
) => {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [tooltipState, setTooltipState] = useState<ScheduleToolTipState>({
    isVisible: false,
    targetRect: null,
    attendees: [],
  });

  const handleCellClick = useCallback(
    (event: React.MouseEvent<HTMLTableElement>) => {
      const target = event.target as HTMLElement;
      if (target.tagName !== 'TD') return;

      const cell = target as HTMLTableCellElement;
      const rect = cell.getBoundingClientRect();

      const rowIndex = (cell.parentElement as HTMLTableRowElement).rowIndex;
      const cellIndex = cell.cellIndex;

      if (!rowIndex || !cellIndex) return;

      const date = availableDates[cellIndex - 1];
      const time = `${rowIndex - 1 + parseInt(firstTime.slice(0, 2))}:00`;

      const attendees = allSchedules?.schedules.find(
        (s: { date: string; time: string }) => s.date === date && s.time === time,
      )?.attendeeNames;

      if (!attendees) {
        setTooltipState({
          isVisible: false,
          targetRect: null,
          attendees: [],
        });
        return;
      }

      setTooltipState({
        isVisible: true,
        targetRect: rect,
        attendees,
      });
    },
    [availableDates, firstTime, allSchedules],
  );

  const hideTooltip = useCallback(() => {
    setTooltipState((prev) => ({ ...prev, isVisible: false }));
  }, []);

  return {
    pageRef,
    tooltipState,
    handleCellClick,
    hideTooltip,
  };
};

export default useScheduleTooltip;
