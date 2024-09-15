// import 하지 않으면 스토리북에서 캘린더 컴포넌트가 렌더링 되지 않아 일단 추가(@해리)
import React from 'react';

import { useCalendarContext } from '@hooks/useCalendarContext/useCalendarContext';

interface HeaderProps {
  render: (props: {
    currentYear: number;
    currentMonth: number;
    moveToNextMonth: () => void;
    moveToPrevMonth: () => void;
    isCurrentMonth?: boolean;
  }) => JSX.Element;
}

export function Header({ render }: HeaderProps) {
  const { headers, view, isCurrentMonth } = useCalendarContext();
  const { currentYear, currentMonth } = headers;
  const { moveToNextMonth, moveToPrevMonth } = view;

  return (
    <>{render({ currentYear, currentMonth, moveToNextMonth, moveToPrevMonth, isCurrentMonth })}</>
  );
}
