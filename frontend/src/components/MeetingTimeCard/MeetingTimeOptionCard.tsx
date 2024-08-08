import {
  s_attendeeInfo,
  s_baseContainer,
  s_checkboxContainer,
  s_checkboxInput,
  s_dateInfo,
  s_getSelectedStyle,
  s_optionContainer,
  s_recommendContainer,
} from './MeetingTimeCard.styles';

const formatDateWithDay = (date: string, dayOfWeek: string) => {
  const currentDateObj = new Date(date);
  const month = currentDateObj.getMonth() + 1;
  const day = currentDateObj.getDate();

  return `${month}월 ${day}일(${dayOfWeek})`;
};

const formatTime = (time: string) => {
  const hour = parseInt(time);
  const hourPrefix = hour >= 12 ? '오후' : '오전';

  return `${hourPrefix} ${hour % 12 || 12}시`;
};

interface DateInfo {
  date: string;
  time: string;
  dayOfWeek: string;
}

const createRecommendDateInfo = ({ date, time, dayOfWeek }: DateInfo) => {
  const meetingDateWithDay = formatDateWithDay(date, dayOfWeek);
  const meetingTime = formatTime(time);

  return `${meetingDateWithDay} ${meetingTime}`;
};

interface MeetingTimeOptionCardProps {
  isSelected: boolean;
  onSelect: () => void;
  attendeeCount: number;
  schedule: {
    startDate: string;
    startDayOfWeek: string;
    startTime: string;
    endDate: string;
    endDayOfWeek: string;
    endTime: string;
    attendeeNames: string[];
  };
}

export default function MeetingTimeOptionCard({
  isSelected,
  onSelect,
  attendeeCount,
  schedule,
}: MeetingTimeOptionCardProps) {
  const { startDate, startTime, startDayOfWeek, endDate, endTime, endDayOfWeek, attendeeNames } =
    schedule;

  const currentAttendeeCount = attendeeNames.length;

  const startRecommendDateInfo = createRecommendDateInfo({
    date: startDate,
    time: startTime,
    dayOfWeek: startDayOfWeek,
  });

  const endRecommendDateInfo = createRecommendDateInfo({
    date: endDate,
    time: endTime,
    dayOfWeek: endDayOfWeek,
  });

  return (
    <button
      css={[s_baseContainer, s_optionContainer, s_getSelectedStyle(isSelected)]}
      onClick={onSelect}
    >
      <div css={s_recommendContainer}>
        <span css={s_attendeeInfo}>{`${attendeeCount}명 중 ${currentAttendeeCount}명`}</span>
        <span css={s_dateInfo}>{startRecommendDateInfo}부터</span>
        <span css={s_dateInfo}>{endRecommendDateInfo}까지</span>
      </div>
      <div css={s_checkboxContainer}>
        <input type="checkbox" checked={isSelected} onChange={onSelect} css={s_checkboxInput} />
      </div>
    </button>
  );
}
