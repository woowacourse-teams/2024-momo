import { css } from '@emotion/react';
import type { FlagObject } from 'types/utility';

import theme from '@styles/theme';

import CALENDAR_PROPERTIES from '@constants/calendar';

export const s_calendarContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const s_calendarContent = css`
  display: grid;
  grid-auto-rows: 4rem;
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

  ${theme.typography.bodyMedium}
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

export const s_baseDaySlot = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 3.6rem;
  height: 3.6rem;
`;

export const s_daySlotButton = css`
  cursor: pointer;
  background-color: transparent;
  border: none;
  ${theme.typography.bodyLight}

  &:disabled {
    cursor: default;
  }
`;

export const s_baseDaySlotText = css`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 3.6rem;
  height: 3.6rem;
`;

type DaySlotStatus = 'isSelectedFullDate' | 'isPrevDate' | 'isHoliday' | 'isSaturday' | 'isToday';

export const s_daySlotText = ({
  isSelectedFullDate,
  isPrevDate,
  isHoliday,
  isSaturday,
  isToday,
}: FlagObject<DaySlotStatus>) => {
  /* 덕지덕지 if문인데 어쩔 수 없다고 생각하기는 했습니다. 가독성을 위해서 switch문을 사용하는 것도 고려해보면 좋을 것 같은데, 코멘트로 의견 부탁드려요(@해리) */
  /* if문 위에서부터 아래로, 스타일이 적용되어야 하는 우선순위입니다. 선택된 날짜의 스타일이 가장 우선적으로 고려되어야 하고, 그 다음은 지난날짜,,,순 입니다. 그래서 early return 패턴을 활용했어요(@해리) */
  if (isSelectedFullDate) return DAY_SLOT_TEXT_STYLES.selected;
  if (isPrevDate) return DAY_SLOT_TEXT_STYLES.prevDay;
  if (isHoliday) return DAY_SLOT_TEXT_STYLES.holiday;
  if (isSaturday) return DAY_SLOT_TEXT_STYLES.saturday;
  if (isToday) return DAY_SLOT_TEXT_STYLES.today;

  return DAY_SLOT_TEXT_STYLES.default;
};

// background-color: ${theme.colors.calendar.backgroundColor.today};
const DAY_SLOT_TEXT_STYLES = {
  selected: css`
    color: ${theme.colors.calendar.color.selected};
    background-color: ${theme.colors.calendar.backgroundColor.selected};
    border-radius: 50%;
  `,
  holiday: css`
    color: ${theme.colors.calendar.color.holiday};
  `,
  today: css`
    color: ${theme.colors.calendar.color.today};
    border-radius: 50%;

    &::after {
      content: '';

      position: absolute;
      bottom: 0.4rem;
      left: 50%;
      transform: translateX(-50%);

      width: 0.4rem;
      height: 0.4rem;

      background-color: ${theme.colors.calendar.color.today};
      border-radius: 50%;
    }
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
