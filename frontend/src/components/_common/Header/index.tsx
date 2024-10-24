import { type PropsWithChildren, useEffect, useRef } from 'react';

import { s_header, s_title } from './Header.styles';

interface HeaderProps {
  title: string;
}

export default function Header({ title, children }: PropsWithChildren<HeaderProps>) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <header css={s_header}>
      {children}
      <h1 css={s_title} ref={titleRef} tabIndex={-1}>
        {title}
      </h1>
    </header>
  );
}
