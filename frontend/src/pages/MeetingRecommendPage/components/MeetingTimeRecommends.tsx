import MeetingRecommendCard from '@components/MeetingTimeCard/MeetingTimeRecommendCard';
import Dropdown from '@components/_common/Dropdown';

import useMeetingTimeRecommendFilter from '@hooks/useMeetingTimeRecommendFilter/useMeetingTimeRecommendFilter';

import { s_attendeesContainer, s_tabButton, s_tipInfo } from '../MeetingRecommendPage.styles';
import { s_container } from './MeetingTimeRecommends.styles';

interface MeetingRecommendsProps {
  uuid: string;
  attendeeNames: string[];
}

export default function MeetingTimeRecommends({ uuid, attendeeNames }: MeetingRecommendsProps) {
  const {
    meetingTimeRecommends,
    isSelectedAllAttendee,
    toggleAttendee,
    checkSelectedAttendee,
    recommendType,
    handleChangeRecommendType,
  } = useMeetingTimeRecommendFilter(uuid, attendeeNames);

  console.log('MeetingTimeRecommends');

  return (
    <div css={s_container}>
      <section css={s_attendeesContainer}>
        <button css={s_tabButton(isSelectedAllAttendee)} onClick={() => toggleAttendee('전체')}>
          전체
        </button>
        {attendeeNames?.map((attendee) => (
          <button
            key={attendee}
            css={s_tabButton(checkSelectedAttendee(attendee))}
            onClick={() => toggleAttendee(attendee)}
          >
            {attendee}
          </button>
        ))}
      </section>
      <span css={s_tipInfo}>원하는 참여인원을 선택해 보세요 :)</span>
      <Dropdown
        value={recommendType}
        onChange={(e) => handleChangeRecommendType(e.target.value)}
        options={[
          { value: 'earliest', label: '빠르게 만나고 싶어요' },
          { value: 'longTerm', label: '길게 만나고 싶어요' },
        ]}
      />
      {meetingTimeRecommends &&
        meetingTimeRecommends.map((recommendInfo, index) => (
          <MeetingRecommendCard
            key={recommendInfo.startDate + index}
            attendeeCount={attendeeNames.length}
            schedule={recommendInfo}
          />
        ))}
    </div>
  );
}
