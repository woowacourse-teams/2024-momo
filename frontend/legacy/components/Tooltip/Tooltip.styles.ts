import type { CSSProperties } from 'react';

type TooltipPosition = 'top' | 'right' | 'left' | 'bottom';

const TOOLTIP_POSITION = {
  top: (targetRect: DOMRect): CSSProperties => ({
    top: `${targetRect.top + window.scrollY}px`,
    left: `${targetRect.left + targetRect.width / 2 + window.scrollX}px`,
    transform: 'translate(-50%, -100%)',
  }),
  bottom: (targetRect: DOMRect): CSSProperties => ({
    top: `${targetRect.bottom + 5}px`,
    left: `${targetRect.left + targetRect.width / 2}px`,
    transform: 'translateX(-50%)',
  }),
  right: (targetRect: DOMRect): CSSProperties => ({
    top: `${targetRect.top + targetRect.height / 2 + window.scrollY}px`,
    left: `${targetRect.right + window.scrollX}px`,
    transform: 'translateY(-50%)',
  }),
  left: (targetRect: DOMRect): CSSProperties => ({
    top: `${targetRect.top + targetRect.height / 2 + window.scrollY}px`,
    left: `${targetRect.left + window.scrollX}px`,
    transform: 'translate(-100%, -50%)',
  }),
};

export const baseTooltipStyle: CSSProperties = {
  position: 'absolute',
  zIndex: 3,
  padding: '1.2rem',
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '0.8rem',
  boxShadow: '0 0.2rem 0.4rem rgb(0 0 0 / 10%)',
};

export const getTooltipPosition = (
  position: TooltipPosition,
  targetRect: DOMRect,
): CSSProperties => {
  return TOOLTIP_POSITION[position](targetRect);
};
