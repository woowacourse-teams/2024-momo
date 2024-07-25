import { Outlet } from 'react-router-dom';

import Header from '@components/_common/Header';

import { s_content, s_globalContainer } from './GlobalLayout.styles';

export default function GlobalLayout() {
  return (
    <div css={s_globalContainer}>
      <Header />
      <div css={s_content}>
        <Outlet />
      </div>
    </div>
  );
}
