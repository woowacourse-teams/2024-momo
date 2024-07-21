import { css } from '@emotion/react';

import theme from '@styles/theme';

export const styledTd = (isSelected: boolean, isUpdate: boolean) => css`
  cursor: pointer;
  color: ${isSelected ? '#121010' : '#fff'};
  background: ${isSelected ? theme.linear.selectedTime : '#ececec'};
  border-radius: 0.4rem;

  &:hover {
    opacity: ${isUpdate ? 0.7 : 1.0};
  }
`;
