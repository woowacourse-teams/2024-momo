import { css } from '@emotion/react';
import theme from '../../styles/theme';

export const title = css`
  width: 100%;
  margin-bottom: 1rem;

  font-size: 4rem;
  font-weight: bold;
  color: transparent;
  text-align: center;

  background: ${theme.linear.selectedTime};
  background-clip: text;
`;
