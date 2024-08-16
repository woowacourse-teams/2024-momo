import type { MeetingDateTime } from 'types/meeting';
import type { MeetingAllSchedules } from 'types/schedule';

import AttendeeTooltip from '@components/AttendeeTooltip';

import { generateAllScheduleTable } from './Picker/SchedulePicker.utils';
import {
  s_container,
  s_scheduleTable,
  s_tableHeaderCell,
  s_tableTimeHeaderCell,
  s_td,
  s_timeColumn,
  s_timeText,
} from './Schedules.styles';
import { formatDate, formatTime, getTooltipPosition } from './Schedules.util';

interface AllSchedulesProps extends MeetingDateTime {
  meetingAllSchedules: MeetingAllSchedules;
}

export default function AllSchedules({
  firstTime,
  lastTime,
  availableDates,
  meetingAllSchedules,
}: AllSchedulesProps) {
  const schedules = generateAllScheduleTable({
    firstTime,
    lastTime,
    availableDates,
    meetingAllSchedules,
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
              {row.map((attendeeCount, columnIndex) => (
                <td key={columnIndex} css={s_td(attendeeCount)}>
                  {attendeeCount > 0 && (
                    <AttendeeTooltip
                      allSchedules={meetingAllSchedules}
                      availableDates={availableDates}
                      rowIndex={rowIndex}
                      columnIndex={columnIndex}
                      firstTime={firstTime}
                      position={getTooltipPosition(
                        rowIndex,
                        columnIndex,
                        schedules.length,
                        row.length,
                      )}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
