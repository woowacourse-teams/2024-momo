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
        background-image: linear-gradient(
          45deg,
          #33272a 25%,
          transparent 25%,
          transparent 50%,
          #33272a 50%,
          #33272a 75%,
          transparent 75%,
          transparent
        );
        background-size: 0.8rem 0.8rem;
        border: 0.2rem solid #33272a;
      `}
    >
      <div css={s_tooltipTrigger} />
    </Tooltip>
  );
}
