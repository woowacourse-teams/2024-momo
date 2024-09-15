import type { DateInfo } from 'types/calendar';

import {
  s_baseDateButton,
  s_baseDateText,
  s_dateContainer,
  s_dateText,
  s_holidayText,
  s_rangeDateButton,
  s_rangeEnd,
  s_rangeStart,
} from './Date.styles';
import { getDateInfo } from './Date.utils';

interface RangeDateProps {
  dateInfo: DateInfo;
  today: Date;
  hasDate: (date: string) => boolean;
  onDateClick: (date: string) => void;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isAllRangeSelected: boolean;
}

export default function RangeDate({
  dateInfo,
  today,
  hasDate,
  onDateClick,
  isRangeStart,
  isRangeEnd,
  isAllRangeSelected,
}: RangeDateProps) {
  const { key, value, status } = dateInfo;
  /* 
  - 오늘인지 아닌지 판단하기 위해서, new Date()를 어디서 호출해야 할지 고민.
  -> getDateInfo를 호출할 때마다 인자로 new Date() 생성자 함수를 호출하든, getDateInfo 내부에서 호출하든 '오늘' 정보를 가지고 있는 인스턴스를 중복해서 생성한다고 판단.
  -> 따라서 한 번만 호출하기 위해서 날짜 데이터 관련 책임을 가지는 useCalendar 커스텀 훅에서 '오늘' 인스턴스를 생성 후 반환하고, props로 전달받아서 재사용하는 것으로 결정.(@해리)
  */
  const {
    date,
    currentFullDate,
    isHoliday,
    isToday,
    isSaturday,
    isSunday,
    isPrevDate,
    holidayName,
  } = getDateInfo(value, today);
  const isSelectedDate = hasDate(currentFullDate);

  return status === 'currentMonth' ? (
    <button
      key={key}
      onClick={() => onDateClick(currentFullDate)}
      disabled={isPrevDate}
      css={[
        s_dateContainer,
        s_baseDateButton,
        s_rangeDateButton(isSelectedDate),
        isRangeStart && s_rangeStart(isAllRangeSelected),
        isRangeEnd && s_rangeEnd(isAllRangeSelected),
        s_dateText({
          isSelectedDate,
          isPrevDate,
          isSunday,
          isSaturday,
          isHoliday,
          isToday,
        }),
      ]}
    >
      <span css={[s_baseDateText]}>{date}</span>
      {isRangeStart && <span css={s_holidayText}>시작</span>}
      {isRangeEnd && <span css={s_holidayText}>끝</span>}
      {!isRangeStart && !isRangeEnd && <span css={s_holidayText}>{holidayName || '\u00A0'}</span>}
    </button>
  ) : (
    <div key={key} css={s_dateContainer}></div>
  );
}
