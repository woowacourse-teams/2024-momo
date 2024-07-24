import { css } from '@emotion/react';

export const s_calendarContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const s_calendarContent = css`
  display: grid;
  grid-auto-rows: 40px;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
`;

export const s_dayOfWeekContainer = css`
  margin-bottom: 2rem;
`;

export const s_dayOfWeek = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 40px;
  height: 40px;
  min-height: 40px;

  font-size: 1.2rem;
  font-weight: normal;
  color: gray;
`;

export const s_monthHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin-bottom: 20px;
  padding: 0 10px;

  font-size: 1.5rem;
  font-weight: bold;
`;

export const s_monthNavigation = css`
  cursor: pointer;
`;

export const s_daySlotButton = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 36px;
  height: 36px;

  background-color: transparent;
  border: none;
`;

// TODO : 공휴일 색 변경 논의 필요(@해리)
// TODO : s_todayDaySlot 추가 예정(@해리)
export const s_daySlot = (isHoliday: boolean) => css`
  cursor: pointer;
  font-size: 1.5rem;
  color: ${isHoliday ? 'red' : '#000'};
`;

export const s_selectedDaySlot = (isSelected: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;

  ${isSelected &&
  css`
    background-color: #fcc;
    border-radius: 50%;
  `}
`;
