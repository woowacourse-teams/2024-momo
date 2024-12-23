import type { SerializedStyles } from '@emotion/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import type { TooltipPosition } from 'types/tooltip';

import {
  getTooltipPosition,
  s_tooltipTrigger,
  tooltipContainer,
  tooltipContent,
} from './Tooltip.styles';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: TooltipPosition;
  visibleStyles?: SerializedStyles;
}

export default function Tooltip({
  content,
  children,
  position = 'top',
  visibleStyles,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => {
    setVisible(true);
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  const positionStyle = {
    ...getTooltipPosition(position),
  };

  return (
    <div css={tooltipContainer}>
      <div
        css={s_tooltipTrigger(visible, visibleStyles)}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </div>
      {/* {visible &&
        createPortal(<div css={[tooltipContent, positionStyle]}>{content}</div>, document.body)} */}
      {/* 스크롤을 할 경우 툴팁의 위치가 고정되지 않는 문제가 발생하기 때문에, 부모 요소 기준 상대적으로 툴팁의 위치가 결정되도록 수정 (2024.12.23 @해리) */}
      {visible && <div css={[tooltipContent, positionStyle]}>{content}</div>}
    </div>
  );
}
