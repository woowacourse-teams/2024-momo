import { formatDate } from '@components/Schedules/Schedules.util';

import {
  s_dateText,
  s_dayText,
  s_tableHeaderCell,
  s_tableHeaderRow,
} from './ScheduleTableFrame.style';

interface ScheduleDateDayListProps {
  availableDates: string[];
}

export default function ScheduleDateDayList({ availableDates }: ScheduleDateDayListProps) {
  return (
    <tr css={s_tableHeaderRow}>
      {availableDates.map((date) => {
        const { dayOfWeek, monthDate } = formatDate(date);
        return (
          <th key={date} css={s_tableHeaderCell}>
            <span css={s_dayText}>{dayOfWeek}</span>
            <span css={s_dateText}>{monthDate}</span>
          </th>
        );
      })}
    </tr>
  );
}
