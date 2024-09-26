import {
  s_baseDayOfWeek,
  s_calendarContent,
  s_dayOfWeek,
  s_dayOfWeekContainer,
} from '@components/MeetingCalendar/Weekdays/MeetingCalendarWeekdays.styles';

interface WeekDaysProps {
  weekdays: string[];
}

export default function WeekDays({ weekdays }: WeekDaysProps) {
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
