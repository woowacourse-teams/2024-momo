import MeetingTimeRecommendCard from '@components/MeetingTimeCard/MeetingTimeRecommendCard';
import MeetingTimeRecommendCardDaysOnly from '@components/MeetingTimeCard/MeetingTimeRecommendCardDaysOnly';
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
      <span css={s_tipInfo}>원하는 참여인원을 선택해 보세요 :)</span>
      <Dropdown
        value={recommendType}
        onChange={(e) => handleChangeRecommendType(e.target.value)}
        options={[
          { value: 'earliest', label: '빠르게 만나고 싶어요' },
          { value: 'longTerm', label: '길게 만나고 싶어요' },
        ]}
      />
      {meetingRecommendResponse &&
        meetingRecommendResponse.recommendedSchedules.map((recommendInfo, index) =>
          meetingRecommendResponse.type === 'DATETIME' ? (
            <MeetingTimeRecommendCard
              key={recommendInfo.startDate + index}
              attendeeCount={attendeeNames.length}
              schedule={recommendInfo}
            />
          ) : (
            <MeetingTimeRecommendCardDaysOnly
              key={recommendInfo.startDate + index}
              attendeeCount={attendeeNames.length}
              schedule={recommendInfo}
            />
          ),
        )}
    </div>
  );
}
