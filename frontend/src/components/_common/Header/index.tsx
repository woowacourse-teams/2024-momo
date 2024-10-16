import type { PropsWithChildren } from 'react';

import { s_header, s_title } from './Header.styles';

interface HeaderProps {
  title: string;
}

export default function Header({ title, children }: PropsWithChildren<HeaderProps>) {
  return (
    <header css={s_header}>
      {children}
      <h1 css={s_title}>{title}</h1>
    </header>
  );
}
