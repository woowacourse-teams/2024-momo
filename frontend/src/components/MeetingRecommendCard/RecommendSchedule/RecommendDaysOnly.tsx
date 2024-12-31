import { Fragment } from 'react';

import type { MeetingRecommend } from '@apis/meetings/recommends';

import { formatFullDate, isSameDate } from '@utils/date';

import { s_dateInfo, s_recommendContainer } from './RecommendSchedule.style';

interface RecommendDaysOnlyProps {
  schedule: MeetingRecommend;
}

export default function RecommendDaysOnly({ schedule }: RecommendDaysOnlyProps) {
  const { startDate, startDayOfWeek, endDate, endDayOfWeek } = schedule;

  const startRecommendDate = formatFullDate({
    fullDate: startDate,
    dayOfWeek: startDayOfWeek,
    format: 'korean',
  });

  const endRecommendDate = formatFullDate({
    fullDate: endDate,
    dayOfWeek: endDayOfWeek,
    format: 'korean',
  });

  return (
    <div css={s_recommendContainer}>
      {/* 만약 하루만 추천해준다면 "00월 00일(수)"로 나오도록 구현(@낙타) */}
      {isSameDate(new Date(startDate), new Date(endDate)) ? (
        <span css={s_dateInfo}>{startRecommendDate}</span>
      ) : (
        <Fragment>
          <span css={s_dateInfo}>{startRecommendDate}부터</span>
          <span css={s_dateInfo}>{endRecommendDate}까지</span>
        </Fragment>
      )}
    </div>
  );
}
