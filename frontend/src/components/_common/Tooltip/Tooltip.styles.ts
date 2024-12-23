import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { TooltipPosition } from 'types/tooltip';

export const tooltipContainer = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const tooltipContent = css`
  position: absolute;
  z-index: 1;
`;

export const getTooltipPosition = (position: TooltipPosition) => {
  const positions = {
    top: css`
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
    `,
    bottom: css`
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    `,
    right: css`
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
    `,
    left: css`
      top: 50%;
      right: 100%;
      transform: translateY(-50%);
    `,
    topLeft: css`
      bottom: 100%;
      left: 0;
    `,
    topRight: css`
      right: 0;
      bottom: 100%;
    `,
    bottomLeft: css`
      top: 100%;
      left: 0;
    `,
    bottomRight: css`
      top: 100%;
      right: 0;
    `,
    leftTop: css`
      top: 0;
      right: 100%;
    `,
    leftBottom: css`
      right: 100%;
      bottom: 0;
    `,
    rightTop: css`
      top: 0;
      left: 100%;
    `,
    rightBottom: css`
      bottom: 0;
      left: 100%;
    `,
  };

  return positions[position] || positions.top;
};

// export const getTooltipPosition = (position: TooltipPosition, targetRect: DOMRect | undefined) => {
//   if (!targetRect) return '';

//   const positions = {
//     top: css`
//       top: ${targetRect.top + window.scrollY}px;
//       left: ${targetRect.left + targetRect.width / 2 + window.scrollX}px;
//       transform: translate(-50%, -100%);
//     `,
//     bottom: css`
//       top: ${targetRect.bottom + window.scrollY}px;
//       left: ${targetRect.left + targetRect.width / 2 + window.scrollX}px;
//       transform: translate(-50%, 0);
//     `,
//     right: css`
//       top: ${targetRect.top + targetRect.height / 2 + window.scrollY}px;
//       left: ${targetRect.right + window.scrollX}px;
//       transform: translate(0, -50%);
//     `,
//     left: css`
//       top: ${targetRect.top + targetRect.height / 2 + window.scrollY}px;
//       left: ${targetRect.left + window.scrollX}px;
//       transform: translate(-100%, -50%);
//     `,
//     topLeft: css`
//       top: ${targetRect.top + window.scrollY}px;
//       left: ${targetRect.left + window.scrollX}px;
//       transform: translate(0, -100%);
//     `,
//     topRight: css`
//       top: ${targetRect.top + window.scrollY}px;
//       left: ${targetRect.right + window.scrollX}px;
//       transform: translate(-100%, -100%);
//     `,
//     bottomLeft: css`
//       top: ${targetRect.bottom + window.scrollY}px;
//       left: ${targetRect.left + window.scrollX}px;
//       transform: translate(0, 0);
//     `,
//     bottomRight: css`
//       top: ${targetRect.bottom + window.scrollY}px;
//       left: ${targetRect.right + window.scrollX}px;
//       transform: translateX(0) translateY(0);
//     `,
//     leftTop: css`
//       top: ${targetRect.top + window.scrollY}px;
//       left: ${targetRect.left + window.scrollX}px;
//       transform: translate(-100%, 0);
//     `,
//     leftBottom: css`
//       top: ${targetRect.bottom + window.scrollY}px;
//       left: ${targetRect.left + window.scrollX}px;
//       transform: translate(-100%, -100%);
//     `,
//     rightTop: css`
//       top: ${targetRect.top + window.scrollY}px;
//       left: ${targetRect.right + window.scrollX}px;
//       transform: translate(0, 0);
//     `,
//     rightBottom: css`
//       top: ${targetRect.bottom + window.scrollY}px;
//       left: ${targetRect.right + window.scrollX}px;
//       transform: translate(0, -100%);
//     `,
//   };

//   return positions[position] || positions.top;
// };

export const s_tooltipTrigger = (
  isVisible: boolean,
  visibleStyles: SerializedStyles | undefined,
) => css`
  cursor: pointer;
  width: 100%;
  height: 100%;
  ${isVisible && visibleStyles}
`;
