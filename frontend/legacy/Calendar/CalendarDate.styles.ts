import { css } from '@emotion/react';
import type { FlagObject } from 'types/utility';

import theme from '@styles/theme';

export const s_dateContainer = css`
  width: 100%;
  min-width: 4.8rem;
  height: 4.8rem;
`;

export const s_baseDateButton = () => css`
  cursor: pointer;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: none;

  &:disabled {
    cursor: default;
  }
`;

export const s_singleDateButton = (isSelectedDate: boolean) => css`
  background-color: ${isSelectedDate ? theme.colors.pink.medium : 'transparent'};
  border-radius: 0.8rem;
`;

export const s_rangeDateButton = (isSelectedDate: boolean) => css`
  background-color: ${isSelectedDate ? theme.colors.pink.light : 'transparent'};
`;

export const s_baseDaySlotText = css`
  ${theme.typography.bodyLight}
`;

type DaySlotStatus =
  | 'isSelectedFullDate'
  | 'isPrevDate'
  | 'isSunday'
  | 'isSaturday'
  | 'isHoliday'
  | 'isToday';

export const s_daySlotText = ({
  isSelectedFullDate,
  isPrevDate,
  isSunday,
  isSaturday,
  isHoliday,
  isToday,
}: FlagObject<DaySlotStatus>) => {
  if (isSelectedFullDate) return DAY_SLOT_TEXT_STYLES.selected;
  if (isHoliday) return DAY_SLOT_TEXT_STYLES.holiday;
  if (isPrevDate) return DAY_SLOT_TEXT_STYLES.prevDay;
  if (isToday) return DAY_SLOT_TEXT_STYLES.today;
  if (isSunday) return DAY_SLOT_TEXT_STYLES.holiday;
  if (isSaturday) return DAY_SLOT_TEXT_STYLES.saturday;

  return DAY_SLOT_TEXT_STYLES.default;
};

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

export const s_holidayText = css`
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.2;
`;

export const s_rangeStart = (isAllRangeSelected: boolean) => css`
  background-color: ${theme.colors.pink.medium};

  &::before {
    content: '';

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;

    width: 20%;
    height: 100%;

    background-color: ${isAllRangeSelected ? theme.colors.pink.light : theme.colors.white};
  }

  &::after {
    content: '';

    position: absolute;
    top: 0;
    right: 0.4px;
    bottom: 0;

    width: 20%;
    height: 100%;

    background-color: ${theme.colors.pink.medium};
    clip-path: polygon(0 0, 100% 50%, 0 100%);
  }
`;

export const s_rangeEnd = (isAllRangeSelected: boolean) => css`
  background-color: ${theme.colors.pink.medium};

  &::before {
    content: '';

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;

    width: 20%;
    height: 100%;

    background-color: ${isAllRangeSelected ? theme.colors.pink.light : theme.colors.white};
  }

  &::after {
    content: '';

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0.4px;

    width: 20%;
    height: 100%;

    background-color: ${theme.colors.pink.medium};
    clip-path: polygon(100% 0, 0 50%, 100% 100%);
  }
`;
