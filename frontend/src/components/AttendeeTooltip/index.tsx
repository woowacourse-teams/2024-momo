import { css } from '@emotion/react';
import type { TooltipPosition } from 'types/tooltip';

import Tooltip from '@components/_common/Tooltip';

import {
  s_attendeeText,
  s_attendeeTooltipContainer,
  s_attendeesContainer,
  s_tooltipTitle,
  s_tooltipTrigger,
} from './AttendeeTooltip.styles';

interface AttendeeTooltipProps {
  attendeeNames: string[];
  position: TooltipPosition;
}

export default function AttendeeTooltip({ attendeeNames, position }: AttendeeTooltipProps) {
  return (
    <Tooltip
      position={position}
      content={
        <div css={s_attendeeTooltipContainer}>
          <p css={s_tooltipTitle}>참여할 수 있어요</p>
          <div css={s_attendeesContainer}>
            {attendeeNames.map((name) => (
              <p key={name} css={s_attendeeText}>
                {name}
              </p>
            ))}
          </div>
        </div>
      }
      visibleStyles={css`
        border: 0.3rem dashed #71717a;
      `}
    >
      <div css={s_tooltipTrigger} />
    </Tooltip>
  );
}
