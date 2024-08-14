import { css } from '@emotion/react';

import theme from '@styles/theme';
import { PRIMITIVE_COLORS } from '@styles/tokens/colors';

export const s_field = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const s_label = css`
  ${theme.typography.subTitleBold}
`;

export const s_description = css`
  ${theme.typography.captionMedium}
  color: ${theme.colors.grey.dark};
`;

export const s_errorText = css`
  ${theme.typography.captionMedium}
  color: ${PRIMITIVE_COLORS.red};
`;
