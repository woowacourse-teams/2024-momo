import { useContext } from 'react';

import { AuthContext } from '@contexts/AuthProvider';

import Logo from '@assets/images/logo.svg';

import { s_button, s_header, s_logoContainer, s_title } from './Header.styles';

export default function Header() {
  const { isLoggedIn } = useContext(AuthContext).state;

  return (
    <header css={s_header}>
      <div css={s_logoContainer}>
        <Logo width={36} height={36} />
        <h1 css={s_title}>momo</h1>
      </div>
      <button css={s_button}>{isLoggedIn ? '로그아웃' : '로그인'}</button>
    </header>
  );
}
