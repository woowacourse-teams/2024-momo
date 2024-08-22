import React from 'react';
import type { MeetingDateTime } from 'types/meeting';
import type { MeetingAllSchedules } from 'types/schedule';

import AttendeeTooltip from '@components/AttendeeTooltip';

import { s_baseTimeCell, s_cellColorByRatio, s_scheduleTableRow } from '../Schedules.styles';
import { generateAllScheduleTable, getTooltipPosition } from '../Schedules.util';

interface AllSchedulesProps extends MeetingDateTime {
  meetingAllSchedules: MeetingAllSchedules;
  meetingAttendees: string[];
}

export default function AllSchedules({
  firstTime,
  lastTime,
  availableDates,
  meetingAttendees,
  meetingAllSchedules,
}: AllSchedulesProps) {
  const allSchedules = generateAllScheduleTable({
    firstTime,
    lastTime,
    availableDates,
    meetingAllSchedules,
  });

  return (
    <>
      {allSchedules.map((row, rowIndex) => (
        <tr key={rowIndex} css={s_scheduleTableRow}>
          {row.map((attendeeNames, columnIndex) => {
            const isHalfHour = rowIndex % 2 !== 0;
            const isLastRow = rowIndex === allSchedules.length - 1;
            const ratio = attendeeNames.length / meetingAttendees.length;

            return (
              <td
                key={columnIndex}
                css={[s_baseTimeCell(isHalfHour, isLastRow), s_cellColorByRatio(ratio)]}
              >
                {attendeeNames.length > 0 && (
                  <AttendeeTooltip
                    attendeeNames={attendeeNames}
                    position={getTooltipPosition(
                      rowIndex,
                      columnIndex,
                      allSchedules.length,
                      row.length,
                    )}
                  />
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}
