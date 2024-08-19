import type { MeetingDateTime } from 'types/meeting';
import type { MeetingSingleSchedule } from 'types/schedule';

import { generateSingleScheduleTable } from './Picker/SchedulePicker.utils';
import {
  s_container,
  s_scheduleTable,
  s_tableHeaderCell,
  s_tableTimeHeaderCell,
  s_td,
  s_timeColumn,
  s_timeText,
} from './Schedules.styles';
import { formatDate, formatTime } from './Schedules.util';

interface SingleScheduleProps extends MeetingDateTime {
  meetingSingleSchedule: MeetingSingleSchedule;
}

export default function SingleSchedule({
  firstTime,
  lastTime,
  availableDates,
  meetingSingleSchedule,
}: SingleScheduleProps) {
  const schedules = generateSingleScheduleTable({
    firstTime,
    lastTime,
    availableDates,
    meetingSingleSchedule,
  });

  return (
    <div css={s_container}>
      <table css={s_scheduleTable} aria-label="약속 시간 조회 테이블">
        <thead>
          <tr>
            <th css={s_tableTimeHeaderCell}></th>
            {availableDates.map((date) => {
              const { dayOfWeek, monthDate } = formatDate(date);
              return (
                <th key={date} css={s_tableHeaderCell}>
                  <span>{dayOfWeek}</span>
                  <br />
                  <span>{monthDate}</span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {schedules.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td css={s_timeColumn}>
                <span css={s_timeText}>
                  {formatTime(`${rowIndex + parseInt(firstTime.slice(0, 2))}:00`)}
                </span>
              </td>
              {row.map((_, columnIndex) => (
                <td key={columnIndex} css={s_td(schedules[rowIndex][columnIndex])} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
