import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  s_attendeesContainer,
  s_tipInfo,
} from '@pages/MeetingConfirmPage/MeetingTimeConfirmPage.styles';

import MeetingTimeOptionCard from '@components/MeetingTimeCard/MeetingTimeOptionCard';
import MeetingTimeOptionCardDaysOnly from '@components/MeetingTimeCard/MeetingTimeOptionCardDaysOnly';
import { Button } from '@components/_common/Buttons/Button';
import TabButton from '@components/_common/Buttons/TabButton';
import Dropdown from '@components/_common/Dropdown';

import useMeetingTimeRecommendFilter from '@hooks/useMeetingTimeRecommendFilter/useMeetingTimeRecommendFilter';

import { postMeetingConfirm } from '@apis/meetings/confirms';
import type { MeetingRecommend } from '@apis/meetings/recommends';

import { s_container } from './MeetingTimeOptions.styles';

interface MeetingTimeOptionsProps {
  uuid: string;
  attendeeNames: string[];
}

interface SelectedMeeting {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

export default function MeetingTimeOptions({ uuid, attendeeNames }: MeetingTimeOptionsProps) {
  const {
    meetingRecommendResponse,
    isSelectedAllAttendee,
    toggleAttendee,
    checkSelectedAttendee,
    recommendType,
    handleChangeRecommendType,
  } = useMeetingTimeRecommendFilter(uuid, attendeeNames);

  const [selectedMeeting, setSelectedMeeting] = useState<SelectedMeeting>({} as SelectedMeeting);
  const navigate = useNavigate();

  // TODO: stores/servers/confirm/mutation.ts 파일로 분리
  const { mutate } = useMutation({
    mutationFn: postMeetingConfirm,
    onSuccess: () => {
      navigate(`/meeting/${uuid}/fixed-meeting-ticket`);
    },
  });

  const handleMeetingConfirmPost = () => {
    mutate({
      uuid,
      requests: selectedMeeting,
    });
  };

  // date, time
  const handleMeetingSelect = (selectedMeeting: MeetingRecommend) => {
    setSelectedMeeting({
      startDate: selectedMeeting.startDate,
      startTime: selectedMeeting.startTime,
      endDate: selectedMeeting.endDate,
      endTime: selectedMeeting.endTime,
    });
  };

  const checkSelectedMeeting = (meeting: MeetingRecommend) => {
    return (
      selectedMeeting.startDate === meeting.startDate &&
      selectedMeeting.startTime === meeting.startTime &&
      selectedMeeting.endDate === meeting.endDate &&
      selectedMeeting.endTime === meeting.endTime
    );
  };

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
        {attendeeNames?.map((attendee) => (
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
      <Button
        disabled={JSON.stringify(selectedMeeting) === JSON.stringify({})}
        onClick={handleMeetingConfirmPost}
        size="m"
        variant="primary"
      >
        확정하기
      </Button>
      <Dropdown
        value={recommendType}
        onChange={(e) => handleChangeRecommendType(e.target.value)}
        options={[
          { value: 'earliest', label: '빠르게 만나고 싶어요' },
          { value: 'longTerm', label: '길게 만나고 싶어요' },
        ]}
      />
      {meetingRecommendResponse &&
        meetingRecommendResponse.recommendedSchedules.map((recommendInfo) =>
          meetingRecommendResponse.type === 'DATETIME' ? (
            <MeetingTimeOptionCard
              key={recommendInfo.rank}
              isSelected={checkSelectedMeeting(recommendInfo)}
              onSelect={() => handleMeetingSelect(recommendInfo)}
              attendeeCount={attendeeNames.length}
              schedule={recommendInfo}
            />
          ) : (
            <MeetingTimeOptionCardDaysOnly
              key={recommendInfo.rank}
              isSelected={checkSelectedMeeting(recommendInfo)}
              onSelect={() => handleMeetingSelect(recommendInfo)}
              attendeeCount={attendeeNames.length}
              schedule={recommendInfo}
            />
          ),
        )}
    </div>
  );
}
