import { css } from '@emotion/react';
import type { PropsWithChildren } from 'react';
import type { TooltipPosition } from 'types/tooltip';

import Tooltip from '@components/_common/Tooltip';

import {
  s_attendeeText,
  s_attendeeTooltipContainer,
  s_attendeesContainer,
  s_tooltipTitle,
} from './AttendeeTooltip.styles';

interface AttendeeTooltipProps {
  attendeeNames: string[];
  position: TooltipPosition;
}

export default function AttendeeTooltip({
  attendeeNames,
  position,
  children,
}: PropsWithChildren<AttendeeTooltipProps>) {
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
        outline: 3px dashed #71717a;
        outline-offset: -3px;
      `}
    >
      {children}
    </Tooltip>
  );
}
