import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_button = css`
  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  width: 12rem;
  height: 4rem;
  padding: 0.4rem 3rem;

  font-weight: 700;
  color: ${theme.colors.primary};

  background: #fff;
  border: 1px solid ${theme.colors.primary};
  border-radius: 8px;
  box-shadow: 0 3px 6px rgb(0 0 0 / 20%);

  &:hover {
    color: #fff;
    background: ${theme.colors.primary};
    border: none;
  }
`;
