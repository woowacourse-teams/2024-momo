import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MeetingTimeOptionCard from '@components/MeetingTimeCard/MeetingTimeOptionCard';
import { Button } from '@components/_common/Buttons/Button';
import Dropdown from '@components/_common/Dropdown';

import useMeetingTimeRecommendFilter from '@hooks/useMeetingTimeRecommendFilter/useMeetingTimeRecommendFilter';

import { postMeetingConfirm } from '@apis/meetingConfirm';
import type { MeetingRecommend } from '@apis/meetingRecommend';

import { s_attendeesContainer, s_tabButton, s_tipInfo } from '../MeetingTimeConfirmPage.styles';
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
    meetingTimeRecommends,
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

  console.log(JSON.stringify(selectedMeeting) === JSON.stringify({}), selectedMeeting, {});

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
      {meetingTimeRecommends &&
        meetingTimeRecommends.map((recommendInfo, index) => (
          <MeetingTimeOptionCard
            key={recommendInfo.startDate + index}
            isSelected={checkSelectedMeeting(recommendInfo)}
            onSelect={() => handleMeetingSelect(recommendInfo)}
            attendeeCount={attendeeNames.length}
            schedule={recommendInfo}
          />
        ))}
    </div>
  );
}
