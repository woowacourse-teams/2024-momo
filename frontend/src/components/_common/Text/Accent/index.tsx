import type { PropsWithChildren } from 'react';


import { s_accentTextStyle } from './Accent.styles';

interface AccentProps extends PropsWithChildren {}

export default function Accent({ children }: AccentProps) {
  return <strong css={s_accentTextStyle}>{children}</strong>;
}
