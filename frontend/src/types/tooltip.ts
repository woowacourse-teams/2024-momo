export type BasicPosition = 'top' | 'left' | 'right' | 'bottom';

export type CombinedPosition =
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

export type TooltipPosition = BasicPosition | CombinedPosition;
