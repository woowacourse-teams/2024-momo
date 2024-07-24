import { Outlet } from 'react-router-dom';

import { s_globalContainer } from './GlobalLayout.styles';

export default function GlobalLayout() {
  return (
    <div css={s_globalContainer}>
      <Outlet />
    </div>
  );
}
