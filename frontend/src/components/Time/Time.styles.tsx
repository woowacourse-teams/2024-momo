import { css } from '@emotion/react';

import theme from '@styles/theme';

export const tableStyle = css`
  cursor: pointer;
  user-select: none;

  border-spacing: 0.4rem 0.4rem;
  border-collapse: collapse;
  border-collapse: separate;

  width: 100%;
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

export const thStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const cellStyle = css`
  cursor: default;
  width: 4rem;
  height: 4rem;
`;

export const buttonContainer = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1rem;
`;
