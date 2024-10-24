import type { HTMLAttributes, PropsWithChildren } from 'react';

import { s_visuallyHidden } from './ScreenReaderOnly.styles';

export default function ScreenReaderOnly({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span {...props} css={s_visuallyHidden}>
      {children}
    </span>
  );
}
