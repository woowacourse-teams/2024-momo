import { css } from '@emotion/react';

import theme from '@styles/theme';
import { PRIMITIVE_COLORS } from '@styles/tokens/colors';

export const s_field = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
`;

export const s_label = css`
  ${theme.typography.subTitleBold}
`;

export const s_description = css`
  color: ${theme.colors.grey.dark};
  white-space: pre-line; /* 줄 바꿈을 인식 */
  ${theme.typography.captionMedium}
`;

export const s_errorMessageWrapper = css`
  display: flex;
  min-height: 2rem;
`;

export const s_errorMessage = css`
  display: flex;
  align-items: center;
  ${theme.typography.captionMedium}
  color: ${PRIMITIVE_COLORS.red[300]};
`;
