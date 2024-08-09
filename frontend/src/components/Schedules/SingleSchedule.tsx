import { css } from '@emotion/react';

import type { MeetingSingleSchedule } from '@apis/schedules';

import { generateScheduleMatrix } from './Picker/SchedulePicker.utils';
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

interface SingleScheduleProps {
  firstTime: string;
  lastTime: string;
  availableDates: string[];
  singleSchedule: MeetingSingleSchedule;
}

export default function SingleSchedule({
  firstTime,
  lastTime,
  availableDates,
  singleSchedule,
}: SingleScheduleProps) {
  const schedules = generateScheduleMatrix({
    firstTime,
    lastTime,
    availableDates,
    meetingSchedules: singleSchedule,
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
                <td
                  key={columnIndex}
                  css={css`
                    ${s_td(schedules[rowIndex][columnIndex])}
                  `}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
