import Logo from '@assets/images/logo.svg';
import MenuIcon from '@assets/images/menu.svg';

import { s_header, s_logoContainer, s_title } from './Header.styles';

export default function Header() {
  return (
    <header css={s_header}>
      <div css={s_logoContainer}>
        <Logo width={36} height={36} />
        <h1 css={s_title}>momo</h1>
      </div>
      <MenuIcon width={36} height={36} />
    </header>
  );
}
