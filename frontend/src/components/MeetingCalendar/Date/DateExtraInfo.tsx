import { s_dateExtraInfoText } from './Date.styles';

const DATE_INFO_TEXTS = {
  today: '오늘',
  rangeStart: '시작',
  rangeEnd: '끝',
  default: '\u00A0',
};

interface DateInfoProps {
  isToday?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  holidayName: string | null;
}

const getDateInfoText = ({ isToday, isRangeStart, isRangeEnd, holidayName }: DateInfoProps) => {
  if (isRangeStart) return DATE_INFO_TEXTS.rangeStart;
  if (isRangeEnd) return DATE_INFO_TEXTS.rangeEnd;
  if (isToday) return DATE_INFO_TEXTS.today;
  if (holidayName) return holidayName;
  return DATE_INFO_TEXTS.default;
};

export default function DateExtraInfo({
  isToday,
  isRangeStart,
  isRangeEnd,
  holidayName,
}: DateInfoProps) {
  return (
    <span css={s_dateExtraInfoText}>
      {getDateInfoText({ isToday, isRangeStart, isRangeEnd, holidayName })}
    </span>
  );
}
