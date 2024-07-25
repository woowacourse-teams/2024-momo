export function getYearMonthInfo(year: number, month: number) {
  const startDate = new Date(year, month - 1, 1);

  /* 
   로직 설명(@hwinkr)
   - 월요일을 index 0으로 변경하기 위해서 나머지 연산자를 활용한다.
   - 자바스크립트 Date 객체는 기본적으로 일요일이 인덱스가 0인데, 모모 달력은 월요일을 인덱스를 0으로 만들어줘야 한다.
   - 따라서, 특정 달의 시작 날짜에 대한 인덱스에 6을 더해주고 7로 나눈 나머지를 사용하는 것으로 구현했다.
  */
  const firstDayIndex = (startDate.getDay() + 6) % 7;

  const lastDayOfMonthDate = new Date(year, month, 0);
  const lastDayNumber = lastDayOfMonthDate.getDate();

  const daySlotCount = firstDayIndex + lastDayNumber;

  return { year, month, firstDayIndex, daySlotCount } as const;
}

export function getDayInfo({
  year,
  month,
  firstDayIndex,
  index,
  currentDate,
}: {
  year: number;
  month: number;
  firstDayIndex: number;
  index: number;
  currentDate: Date;
}) {
  const date = index - firstDayIndex + 1;
  const isDate = index >= firstDayIndex;

  const dateString = `${year}-${month}-${date}`;
  const todayString = `${year}-${month}-${currentDate.getDate()}`;
  const isToday = dateString === todayString;
  // TODO : 일단은 일요일만 isHolday로 설정되도록 구현, 추후에 진짜 공휴일도 포함할 것인지 논의 필요, 찾아보니 라이브러리가 있더라구요.(@해리)
  // TODO : 매직넘버 의미있는 상수화 필요(@해리)
  const isHoliday = index % 7 === 6;

  return { date, dateString, isDate, isToday, isHoliday } as const;
}
