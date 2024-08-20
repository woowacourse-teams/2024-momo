import { css } from '@emotion/react';
import type { TooltipPosition } from 'types/tooltip';

// import theme from '@styles/theme';

export const tooltipContainer = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const tooltipContent = css`
  position: absolute;
`;

export const getTooltipPosition = (position: TooltipPosition, targetRect: DOMRect | undefined) => {
  if (!targetRect) return '';

  const positions = {
    top: css`
      top: ${targetRect.top + window.scrollY}px;
      left: ${targetRect.left + targetRect.width / 2 + window.scrollX}px;
      transform: translate(-50%, -100%);
    `,
    bottom: css`
      top: ${targetRect.bottom + window.scrollY}px;
      left: ${targetRect.left + targetRect.width / 2 + window.scrollX}px;
      transform: translate(-50%, 0);
    `,
    right: css`
      top: ${targetRect.top + targetRect.height / 2 + window.scrollY}px;
      left: ${targetRect.right + window.scrollX}px;
      transform: translate(0, -50%);
    `,
    left: css`
      top: ${targetRect.top + targetRect.height / 2 + window.scrollY}px;
      left: ${targetRect.left + window.scrollX}px;
      transform: translate(-100%, -50%);
    `,
    topLeft: css`
      top: ${targetRect.top + window.scrollY}px;
      left: ${targetRect.left + window.scrollX}px;
      transform: translate(0, -100%);
    `,
    topRight: css`
      top: ${targetRect.top + window.scrollY}px;
      left: ${targetRect.right + window.scrollX}px;
      transform: translate(-100%, -100%);
    `,
    bottomLeft: css`
      top: ${targetRect.bottom + window.scrollY}px;
      left: ${targetRect.left + window.scrollX}px;
      transform: translate(0, 0);
    `,
    bottomRight: css`
      top: ${targetRect.bottom + window.scrollY}px;
      left: ${targetRect.right + window.scrollX}px;
      transform: translateX(0) translateY(0);
    `,
    leftTop: css`
      top: ${targetRect.top + window.scrollY}px;
      left: ${targetRect.left + window.scrollX}px;
      transform: translate(-100%, 0);
    `,
    leftBottom: css`
      top: ${targetRect.bottom + window.scrollY}px;
      left: ${targetRect.left + window.scrollX}px;
      transform: translate(-100%, -100%);
    `,
    rightTop: css`
      top: ${targetRect.top + window.scrollY}px;
      left: ${targetRect.right + window.scrollX}px;
      transform: translate(0, 0);
    `,
    rightBottom: css`
      top: ${targetRect.bottom + window.scrollY}px;
      left: ${targetRect.right + window.scrollX}px;
      transform: translate(0, -100%);
    `,
  };

  return positions[position] || positions.top;
};

export const tooltipTrigger = css`
  cursor: pointer;
  height: 100%;
`;
