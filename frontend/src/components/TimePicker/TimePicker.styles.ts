import { css } from '@emotion/react';

import theme from '@styles/theme';

export const tableStyle = css`
  user-select: none;
  border-collapse: collapse;
`;

export const tdStyle = css`
  cursor: pointer;
  padding: 8px;
  text-align: center;
  border-radius: 0.4rem;
`;

export const selectedStyle = css`
  color: white;
  background: ${theme.linear.selectedTime};
`;

export const table = css`
  cursor: pointer;
  user-select: none;

  border-spacing: 0.4rem 0.4rem;
  border-collapse: separate;

  width: 100%;
`;

export const styledTh = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const tableTexture = css`
  cursor: default;
  width: 4rem;
  height: 4rem;
`;
