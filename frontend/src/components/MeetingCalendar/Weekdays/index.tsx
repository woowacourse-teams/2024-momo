import {
  s_baseDayOfWeek,
  s_calendarContent,
  s_dayOfWeek,
  s_dayOfWeekContainer,
} from './MeetingCalendarWeekdays.styles';

interface MeetingCalendarWeekdaysProps {
  weekdays: string[];
}

export default function MeetingCalendarWeekdays({ weekdays }: MeetingCalendarWeekdaysProps) {
  return (
    <section css={[s_calendarContent, s_dayOfWeekContainer]}>
      {weekdays.map((day, index) => (
        <div key={day} css={[s_baseDayOfWeek, s_dayOfWeek(index)]}>
          {day}
        </div>
      ))}
    </section>
  );
}
