import { css } from '@emotion/react';

import theme from '@styles/theme';

import CALENDAR_PROPERTIES from '@constants/calendar';

export const s_calendarContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const s_calendarContent = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
`;

export const s_dayOfWeekContainer = css`
  margin-bottom: 2rem;
`;

export const s_baseDayOfWeek = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 4rem;
  height: 4rem;
  min-height: 4rem;

  ${theme.typography.bodyMedium}
`;

export const s_dayOfWeek = (index: number) => {
  if (index === CALENDAR_PROPERTIES.sundayNumber)
    return css`
      ${DAY_SLOT_TEXT_STYLES.holiday}
    `;

  if (index === CALENDAR_PROPERTIES.saturdayNumber)
    return css`
      ${DAY_SLOT_TEXT_STYLES.saturday}
    `;

  return css`
    ${DAY_SLOT_TEXT_STYLES.default}
  `;
};

export const s_monthHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin-bottom: 2rem;
  padding: 0 1rem;
`;

export const s_monthNavigation = css`
  cursor: pointer;
  background-color: transparent;
  border: none;

  ${theme.typography.titleMedium}

  &:disabled {
    color: ${theme.colors.grey.primary};
  }
`;

const DAY_SLOT_TEXT_STYLES = {
  selected: css`
    color: ${theme.colors.calendar.color.selected};
  `,
  holiday: css`
    color: ${theme.colors.calendar.color.holiday};
  `,
  today: css`
    color: ${theme.colors.calendar.color.today};
  `,
  saturday: css`
    color: #8c9eff;
  `,
  prevDay: css`
    color: ${theme.colors.grey.primary};
  `,
  default: css`
    color: ${theme.colors.black};
  `,
};
