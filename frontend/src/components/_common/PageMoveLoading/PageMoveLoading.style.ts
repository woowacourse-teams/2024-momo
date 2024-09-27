import { css } from '@emotion/react';

import { PRIMITIVE_COLORS } from '@styles/tokens/colors';

export const s_loadingWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

export const s_text = css`
  color: ${PRIMITIVE_COLORS.grey[500]};
`;
