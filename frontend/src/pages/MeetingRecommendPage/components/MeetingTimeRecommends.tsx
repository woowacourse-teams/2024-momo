import MeetingRecommendCard from '@components/MeetingRecommendCard/MeetingRecommendCard';
import TabButton from '@components/_common/Buttons/TabButton';
import Dropdown from '@components/_common/Dropdown';

import useMeetingTimeRecommendFilter from '@hooks/useMeetingTimeRecommendFilter/useMeetingTimeRecommendFilter';

import { s_attendeesContainer, s_tipInfo } from '../MeetingRecommendPage.styles';
import { s_container } from './MeetingTimeRecommends.styles';

interface MeetingRecommendsProps {
  uuid: string;
  attendeeNames: string[];
}

export default function MeetingTimeRecommends({ uuid, attendeeNames }: MeetingRecommendsProps) {
  const {
    meetingRecommendResponse,
    isSelectedAllAttendee,
    toggleAttendee,
    checkSelectedAttendee,
    recommendType,
    handleChangeRecommendType,
  } = useMeetingTimeRecommendFilter(uuid, attendeeNames);

  return (
    <div css={s_container}>
      {/* 만약 TabButton의 로직이 변경되면 MeetingConfirmPage에 있는 로직도 함께 변경되어야 함 (@낙타) */}
      <span css={s_tipInfo}>원하는 참여인원을 선택해 보세요 :)</span>
      <section css={s_attendeesContainer}>
        <TabButton
          tabButtonVariants="outlinedFloating"
          isActive={isSelectedAllAttendee}
          onClick={() => toggleAttendee('전체')}
        >
          전체
        </TabButton>
        {attendeeNames.map((attendee) => (
          <TabButton
            tabButtonVariants="outlinedFloating"
            isActive={checkSelectedAttendee(attendee)}
            onClick={() => toggleAttendee(attendee)}
            key={attendee}
          >
            {attendee}
          </TabButton>
        ))}
      </section>

      {meetingRecommendResponse && meetingRecommendResponse.type === 'DATETIME' && (
        <Dropdown
          value={recommendType}
          onChange={(e) => handleChangeRecommendType(e.target.value)}
          options={[
            { value: 'earliest', label: '빠르게 만나고 싶어요' },
            { value: 'longTerm', label: '길게 만나고 싶어요' },
          ]}
        />
      )}
      {meetingRecommendResponse &&
        meetingRecommendResponse.recommendedSchedules.map((recommendInfo) => (
          <MeetingRecommendCard
            key={recommendInfo.rank}
            totalAttendees={attendeeNames}
            type={meetingRecommendResponse.type}
            schedule={recommendInfo}
          />
        ))}
    </div>
  );
}
