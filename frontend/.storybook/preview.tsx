import { Global, ThemeProvider } from '@emotion/react';
import type { Preview } from '@storybook/react';
import React from 'react';

import ToastProvider from '../src/contexts/ToastProvider';
import globalStyles from '../src/styles/global';
import theme from '../src/styles/theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Global styles={globalStyles} />
        <Story />
      </ToastProvider>
    </ThemeProvider>
  ),
];
