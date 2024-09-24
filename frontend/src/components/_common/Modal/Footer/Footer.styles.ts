import { css } from '@emotion/react';

import type { ButtonPositionType } from '.';

export const s_container = (buttonPosition: ButtonPositionType) => css`
  display: flex;
  flex-direction: ${buttonPosition};
  gap: 0.8rem;
  margin-top: 2.4rem;
`;
