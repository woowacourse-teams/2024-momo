import type { PropsWithChildren } from 'react';

import { s_container } from './Main.styles';

export default function Main({ children }: PropsWithChildren) {
  return <div css={s_container}>{children}</div>;
}
