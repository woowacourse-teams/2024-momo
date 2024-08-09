export const formatDate = (dateString: string) => {
  const currentDateObj = new Date(dateString);
  const currentMonth = currentDateObj.getMonth() + 1;
  const currentDay = currentDateObj.getDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][currentDateObj.getDay()];

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
