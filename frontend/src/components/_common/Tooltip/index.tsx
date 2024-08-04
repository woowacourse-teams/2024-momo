import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { TooltipPosition } from 'types/tooltip';

import {
  getTooltipPosition,
  tooltipContainer,
  tooltipContent,
  tooltipTrigger,
} from './Tooltip.styles';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: TooltipPosition;
}

export default function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const showTooltip = () => {
    setVisible(true);
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  const positionStyle = {
    ...getTooltipPosition(position, triggerRef?.current?.getBoundingClientRect()),
  };

  useEffect(() => {
    if (triggerRef.current) {
      console.log(triggerRef.current.getBoundingClientRect());
    }
  }, [visible]);

  return (
    <div css={tooltipContainer}>
      <div
        css={tooltipTrigger}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        ref={triggerRef}
      >
        {children}
      </div>
      {/* cratePortal과 부모 요소 기준 위치를 잡는 것 중 어느 것을 선호하시나요?(@해리) */}
      {visible &&
        createPortal(<div css={[tooltipContent, positionStyle]}>{content}</div>, document.body)}
      {/* {visible && <div css={[tooltipContent, positionStyle]}>{content}</div>} */}
    </div>
  );
}
