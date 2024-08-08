import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_tooltipTrigger = css`
  width: 100%;
  height: 100%;
`;

export const s_container = css`
  min-width: max-content;
`;

export const s_tooltipTitle = css`
  ${theme.typography.bodyBold}
`;

export const s_attendeeText = css`
  ${theme.typography.captionLight}
`;
