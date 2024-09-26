import type { PropsWithChildren } from 'react';

import { s_title } from './Header.styles';

export default function Header({ children }: PropsWithChildren) {
  return <h2 css={s_title}>{children}</h2>;
}
