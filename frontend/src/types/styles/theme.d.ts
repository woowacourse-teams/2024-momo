import '@emotion/react';

import type { SEMANTIC_COLORS } from '@styles/tokens/colors';
import type TYPOGRAPHY from '@styles/tokens/typographys';

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof SEMANTIC_COLORS;
    typography: typeof TYPOGRAPHY;
  }
}
