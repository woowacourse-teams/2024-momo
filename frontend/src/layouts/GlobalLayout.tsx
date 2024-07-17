import { Outlet } from 'react-router-dom';
import { globalContainer } from './GlobalLayout.styles';

export default function GlobalLayout() {
  return (
    <div css={globalContainer}>
      <Outlet />
    </div>
  );
}
