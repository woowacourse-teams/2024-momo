import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_tooltipTrigger = css`
  width: 100%;
  height: 100%;
`;

export const s_attendeeTooltipContainer = css`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  width: 12rem;
  padding: 1.2rem;

  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.primary};
  border-radius: 0.8rem;
  box-shadow: 0 0.2rem 0.4rem rgb(0 0 0 / 10%);
`;

export const s_tooltipTitle = css`
  ${theme.typography.captionBold}
  color: ${theme.colors.pink.medium};
`;

export const s_attendeesContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

export const s_attendeeText = css`
  width: fit-content;
  ${theme.typography.captionLight}
`;
