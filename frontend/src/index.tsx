import ReactDOM from 'react-dom/client';
import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';

import App from './App';
import globalStyles from './styles/global';
import theme from './styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
