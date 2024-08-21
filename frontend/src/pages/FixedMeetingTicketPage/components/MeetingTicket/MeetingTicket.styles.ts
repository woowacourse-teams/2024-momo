import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_container = css`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 2rem;

  background-color: ${theme.colors.pink.lightest};
  border-radius: 1rem;
  box-shadow:
    rgb(50 50 93 / 25%) 0 6px 12px -2px,
    rgb(0 0 0 / 30%) 0 3px 7px -3px;
`;

export const s_characterWrapper = css`
  display: flex;
  justify-content: center;
`;
