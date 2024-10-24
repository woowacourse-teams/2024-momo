import type { DateInfo } from 'types/calendar';

import { useCalendarContext } from '@hooks/useCalendarContext/useCalendarContext';

import { s_calendarContent } from '../Calendar.styles';

interface BodyProps {
  renderDate: (dateInfo: DateInfo, today: Date) => JSX.Element;
}

export default function Body({ renderDate }: BodyProps) {
  const { body } = useCalendarContext();

  return (
    <div css={s_calendarContent}>
      {body.value.map(({ value: onWeekDays }) =>
        onWeekDays.map((dateInfo) => renderDate(dateInfo, body.today)),
      )}
    </div>
  );
}
