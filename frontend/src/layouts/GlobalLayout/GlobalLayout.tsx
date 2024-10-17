import { ErrorBoundary } from '@sentry/react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthProvider } from '@contexts/AuthProvider';

import ErrorPage from '@pages/ErrorPage';

import PageMoveLoading from '@components/_common/PageMoveLoading';

import { s_globalContainer } from './GlobalLayout.styles';

export default function GlobalLayout() {
  return (
    <AuthProvider>
      <div css={s_globalContainer}>
        <Suspense fallback={<PageMoveLoading />}>
          <ErrorBoundary fallback={({ error }) => <ErrorPage error={error} />}>
            <Suspense fallback={<PageMoveLoading />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </Suspense>
      </div>
    </AuthProvider>
  );
}
