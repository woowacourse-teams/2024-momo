import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';

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

const queryClient = new QueryClient();

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <>
        <Global styles={globalStyles} />
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ThemeProvider>
        ,
      </>
      ,
    </React.StrictMode>,
  );
});
