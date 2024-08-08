import { css } from '@emotion/react';
import React from 'react';
import type { MeetingAllSchedules } from 'types/meeting';

import { generateScheduleMatrix } from '@components/Time/Picker/TimePicker.util';
import AttendeeTooltip from '@components/legacy/AttendeeTooltip/index';

import useScheduleTooltip from '@hooks/legacy/useScheduleTooltip/useScheduleTooltip';

import {
  s_scheduleTable,
  s_tableHeaderCell,
  s_td,
  s_timeColumn,
  s_timeText,
} from './AllSchdules.styles';
import { formatDate, formatTime } from './AllSchdules.utils';

interface AllSchedulesProps {
  firstTime: string;
  lastTime: string;
  availableDates: string[];
  allSchedules: MeetingAllSchedules;
}

export default function AllSchedules({
  firstTime,
  lastTime,
  availableDates,
  allSchedules,
}: AllSchedulesProps) {
  const { tooltipState, handleCellClick, hideTooltip } = useScheduleTooltip(
    availableDates,
    firstTime,
    allSchedules,
  );

  const schedules = generateScheduleMatrix({
    firstTime,
    lastTime,
    availableDates,
    meetingSchedules: allSchedules,
  });

  return (
    <>
      <table css={s_scheduleTable} aria-label="약속 시간 조회 테이블" onClick={handleCellClick}>
        <thead>
          <tr>
            <th css={s_tableHeaderCell}></th>
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
      {tooltipState.targetRect && (
        <AttendeeTooltip
          attendees={tooltipState.attendees}
          isVisible={tooltipState.isVisible}
          triggerRect={tooltipState.targetRect}
        />
      )}
    </>
  );
}
