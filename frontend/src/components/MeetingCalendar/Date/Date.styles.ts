import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { FlagObject } from 'types/utility';

import { isValidArrayType } from '@utils/typeGuards';

import theme from '@styles/theme';

export const s_dateContainer = css`
  width: 100%;
  min-width: 4.8rem;
  height: 4.8rem;
`;

export const s_baseDateButton = css`
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

// 하나씩 선택하는 경우와, 시작/끝 기간으로 선택하는 경우 스타일을 구분.
// 하나로 합쳐서 스타일 함수에서 분기 처리 하는 것 보다, 이름으로 스타일 책임을 구분할 수 있는 방법을 선택. (@해리)

export const s_singleDateButton = (isSelectedDate: boolean) => css`
  background-color: ${isSelectedDate ? theme.colors.pink.medium : 'transparent'};
  border-radius: 0.8rem;
`;

export const s_rangeDateButton = (isSelectedDate: boolean) => css`
  background-color: ${isSelectedDate ? theme.colors.pink.light : 'transparent'};
`;

export const s_baseDateText = css`
  ${theme.typography.bodyLight}
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

type DateStatus =
  | 'isSelectedDate'
  | 'isPrevDate'
  | 'isSunday'
  | 'isSaturday'
  | 'isHoliday'
  | 'isToday';

const dateStatusStyleMap: Record<DateStatus, SerializedStyles> = {
  isSelectedDate: DAY_SLOT_TEXT_STYLES.selected,
  isToday: DAY_SLOT_TEXT_STYLES.today,
  isPrevDate: DAY_SLOT_TEXT_STYLES.prevDay,
  isHoliday: DAY_SLOT_TEXT_STYLES.holiday,
  isSunday: DAY_SLOT_TEXT_STYLES.holiday,
  isSaturday: DAY_SLOT_TEXT_STYLES.saturday,
};

export const s_dateText = (dateStatusMap: FlagObject<DateStatus>) => {
  // key가 dateStatusMap에 속하는 타입인지 확정할 수 없는 문제 발생 -> type guard 함수로 해결(@해리)
  const dateStatusArray = Object.keys(dateStatusMap);
  if (!isValidArrayType<string, DateStatus>(Object.keys(dateStatusMap), dateStatusArray)) return;

  const status = dateStatusArray.find((key) => dateStatusMap[key]);

  return status ? dateStatusStyleMap[status] : DAY_SLOT_TEXT_STYLES.default;
};

export const s_dateExtraInfoText = css`
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
