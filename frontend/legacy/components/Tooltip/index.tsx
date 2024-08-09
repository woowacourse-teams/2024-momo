import type { CSSProperties } from 'react';
import { type PropsWithChildren } from 'react';

import { baseTooltipStyle, getTooltipPosition } from './Tooltip.styles';

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

interface TooltipProps extends PropsWithChildren {
  position?: TooltipPosition;
  isVisible: boolean;
  triggerRect: DOMRect;
}

export default function Tooltip({
  position = 'top',
  isVisible,
  triggerRect,
  children,
}: TooltipProps) {
  if (!isVisible) return null;

  const positionStyle = getTooltipPosition(position, triggerRect);
  const combinedStyle: CSSProperties = { ...baseTooltipStyle, ...positionStyle };

  return (
    <div style={combinedStyle} aria-label="툴팁">
      {children}
    </div>
  );
}
