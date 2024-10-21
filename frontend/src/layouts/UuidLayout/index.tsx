import { Outlet } from 'react-router-dom';

import UuidProvider from '@contexts/UuidProvider';

export default function UuidLayout() {
  return (
    <UuidProvider>
      <Outlet />
    </UuidProvider>
  );
}
