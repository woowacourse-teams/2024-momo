import { useContext } from 'react';

import { CalendarContext } from '@contexts/CalendarProvider';

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('useCalendarContext 커스텀 훅은 캘린더 컴포넌트 내부에서만 사용할 수 있어요^^');
  }

  return context;
};
