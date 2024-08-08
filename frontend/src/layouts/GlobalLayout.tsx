import { Outlet } from 'react-router-dom';

import { AuthProvider } from '@contexts/AuthProvider';

import Header from '@components/_common/Header';

import { s_content, s_globalContainer } from './GlobalLayout.styles';

export default function GlobalLayout() {
  return (
    <AuthProvider>
      <div css={s_globalContainer}>
        <Header />
        <div css={s_content}>
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  );
}
