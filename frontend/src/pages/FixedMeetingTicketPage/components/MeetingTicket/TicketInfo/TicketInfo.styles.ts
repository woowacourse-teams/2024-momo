import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_container = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 2rem 1.25rem;

  background-color: ${theme.colors.white};
  border-radius: 1rem;
`;

export const s_meetingName = css`
  ${theme.typography.subTitleMedium}
  text-align: center;
`;

export const s_ticketInfoContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const s_ticketInfoTitle = css`
  ${theme.typography.bodyMedium}
`;

export const s_attendeeNamesContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const s_attendeeNameTag = css`
  width: fit-content;
  height: fit-content;
  padding: 0.5rem;

  color: ${theme.colors.white};

  background-color: ${theme.colors.pink.mediumDark};
  border-radius: 1rem 0.5rem;

  ${theme.typography.captionMedium}
`;
