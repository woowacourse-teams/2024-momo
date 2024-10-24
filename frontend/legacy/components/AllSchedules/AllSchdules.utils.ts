import { DAY_OF_WEEK_KR } from '../../../src/constants/date';

export const formatDate = (dateString: string) => {
  const currentDateObj = new Date(dateString);
  const currentMonth = currentDateObj.getMonth() + 1;
  const currentDay = currentDateObj.getDate();
  const dayOfWeek = DAY_OF_WEEK_KR[currentDateObj.getDay()];

  return {
    dayOfWeek,
    monthDate: `${currentMonth}/${currentDay}`,
  } as const;
};

export const formatTime = (time: string) => {
  const hour = parseInt(time);
  const hourPrefix = hour >= 12 ? '오후' : '오전';

  return `${hourPrefix} ${hour % 12 || 12}시`;
};
