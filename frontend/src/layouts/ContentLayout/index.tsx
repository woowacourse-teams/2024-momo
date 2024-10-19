import type { PropsWithChildren } from 'react';

import { s_content } from './ContentLayout.style';

export default function ContentLayout({ children }: PropsWithChildren) {
  return <main css={s_content}>{children}</main>;
}
