// import 하지 않으면 스토리북에서 캘린더 컴포넌트가 렌더링 되지 않아 일단 추가(@해리)
import { useCalendarContext } from '@hooks/useCalendarContext/useCalendarContext';

interface WeekDaysProps {
  render: (weekDays: string[]) => JSX.Element;
}

export default function WeekDays({ render }: WeekDaysProps) {
  const { headers } = useCalendarContext();
  const { weekDays } = headers;

  return render(weekDays);
}
