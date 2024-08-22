import React from 'react';
import type { MeetingDateTime } from 'types/meeting';
import type { MeetingSingleSchedule } from 'types/schedule';

import { s_baseTimeCell, s_cellColorBySelected, s_scheduleTableRow } from '../Schedules.styles';
import { generateSingleScheduleTable } from '../Schedules.util';

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
    <>
      {schedules.map((row, rowIndex) => (
        <tr key={rowIndex} css={s_scheduleTableRow}>
          {row.map((isSelected, columnIndex) => {
            const isHalfHour = rowIndex % 2 !== 0;
            const isLastRow = rowIndex === schedules.length - 1;

            return (
              <td
                key={columnIndex}
                css={[s_baseTimeCell(isHalfHour, isLastRow), s_cellColorBySelected(isSelected)]}
              ></td>
            );
          })}
        </tr>
      ))}
    </>
  );
}
