import React, { useLayoutEffect, useRef, useState } from 'react';

import Tooltip from '../Tooltip';
import { s_attendeeText, s_container, s_tooltipTitle } from './AttendeeTooltip.styles';

interface AttendeeTooltipProps {
  attendees: string[];
  isVisible: boolean;
  triggerRect: DOMRect;
}

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

const DEFAULT_POSITION = 'right';

const AttendeeTooltip: React.FC<AttendeeTooltipProps> = ({ attendees, isVisible, triggerRect }) => {
  const [position, setPosition] = useState<TooltipPosition>(DEFAULT_POSITION);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const contentRect = contentRef.current.getBoundingClientRect();

    if (triggerRect.x + contentRect.width > 350) {
      setPosition('left');
      return;
    }

    if (triggerRect.x + triggerRect.width > window.innerWidth / 2) {
      setPosition('top');
      return;
    }

    setPosition(DEFAULT_POSITION);
  }, [attendees, triggerRect]);

  return (
    <Tooltip isVisible={isVisible} triggerRect={triggerRect} position={position}>
      <div ref={contentRef} css={s_container}>
        <p css={s_tooltipTitle}>참여할 수 있어요</p>
        <ul>
          {attendees.map((attendee, index) => (
            <li key={index} css={s_attendeeText}>
              {attendee}
            </li>
          ))}
        </ul>
      </div>
    </Tooltip>
  );
};

export default AttendeeTooltip;
