import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_descriptionContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  strong {
    ${theme.typography.captionBold}
    color: ${theme.colors.primary}
  }
`;

export const s_description = css`
  ${theme.typography.captionMedium}
  display: flex;
  gap: 0.8rem;
`;

export const s_availableDateDescription = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const s_availableDatesContainer = css`
  ${theme.typography.captionMedium}
  display: grid;
  grid-template-columns: 2fr 5fr;
`;
