import { Global, ThemeProvider } from '@emotion/react';
import * as Sentry from '@sentry/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { ErrorProvider } from '@contexts/ErrorProvider';
import ToastProvider from '@contexts/ToastProvider';

import ErrorToastNotifier from '@components/ErrorToastNotifier';
import QueryClientManager from '@components/QueryClientManager';

import globalStyles from '@styles/global';
import theme from '@styles/theme';

import App from './App';

const enableMocking = async () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('@mocks/browser');

  return worker.start();
};

Sentry.init({
  dsn: `${process.env.SENTRY_DSN}`,
  environment: process.env.NODE_ENV,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  enabled: process.env.NODE_ENV !== 'development',
});

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Global styles={globalStyles} />
      <ThemeProvider theme={theme}>
        <ErrorProvider>
          <QueryClientManager>
            <ReactQueryDevtools initialIsOpen={false} />
            <ToastProvider>
              <ErrorToastNotifier />
              <App />
            </ToastProvider>
          </QueryClientManager>
        </ErrorProvider>
      </ThemeProvider>
    </React.StrictMode>,
  );
});
