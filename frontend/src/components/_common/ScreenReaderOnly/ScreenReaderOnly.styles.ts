import { css } from '@emotion/react';

export const s_visuallyHidden = css`
  position: absolute;

  overflow: hidden;

  width: 1px;
  height: 1px;

  white-space: nowrap;

  clip: rect(0 0 0 0);
  clip-path: inset(50%);
`;
