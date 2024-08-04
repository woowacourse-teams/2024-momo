import type { MeetingAllSchedules } from 'types/meeting';
import type { TooltipPosition } from 'types/tooltip';

import Tooltip from '@components/_common/Tooltip';

import {
  s_attendeeText,
  s_container,
  s_tooltipTitle,
  s_tooltipTrigger,
} from './AttendeeTooltip.styles';
import { findAttendeeNames } from './AttendeeTooltip.utils';

interface AttendeeTooltipProps {
  allSchedules: MeetingAllSchedules;
  availableDates: string[];
  columnIndex: number;
  rowIndex: number;
  firstTime: string;
  position: TooltipPosition;
}

// 참석자를 결정해서 props로 넘겨주면 props를 3개로 줄일 수 있을듯(@해리)
// -> 공수가 꽤나 많이 드는 작업이라서 나중으로
// 위치를 결정해서 주입 받도록 했다. 현재는 2차원 배열의 인덱스를 기준으로 결정(@해리)
export default function AttendeeTooltip({
  allSchedules,
  availableDates,
  rowIndex,
  columnIndex,
  firstTime,
  position,
}: AttendeeTooltipProps) {
  const attendeeNames = findAttendeeNames(
    allSchedules,
    availableDates,
    columnIndex,
    rowIndex,
    firstTime,
  );

  return (
    <Tooltip
      position={position}
      content={
        <div css={s_container}>
          <p css={s_tooltipTitle}>참여할 수 있어요</p>
          <ul>
            {attendeeNames.map((name, index) => (
              <li key={index} css={s_attendeeText}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      }
    >
      <div css={s_tooltipTrigger} />
    </Tooltip>
  );
}
