import type { PropsWithChildren } from 'react';

import { s_container } from './Footer.styles';

export type ButtonPositionType = 'column' | 'row';

interface FooterProps {
  buttonPosition: ButtonPositionType;
}

export default function Footer({
  buttonPosition = 'row',
  children,
}: PropsWithChildren<FooterProps>) {
  return <div css={s_container(buttonPosition)}>{children}</div>;
}
