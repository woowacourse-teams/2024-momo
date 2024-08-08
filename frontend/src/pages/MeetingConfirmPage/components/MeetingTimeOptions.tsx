import React, { useState } from 'react';

import MeetingTimeOptionCard from '@components/MeetingTimeCard/MeetingTimeOptionCard';
import Dropdown from '@components/_common/Dropdown';

import useMeetingTimeRecommendFilter from '@hooks/useMeetingTimeRecommendFilter/useMeetingTimeRecommendFilter';

import { s_attendeesContainer, s_tabButton, s_tipInfo } from '../MeetingTimeConfirmPage.styles';
import { s_container } from './MeetingTimeOptions.styles';

interface MeetingTimeOptionsProps {
  uuid: string;
  attendeeNames: string[];
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

  const [selectedMeeting, setSelectedMeeting] = useState(0);

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
          <MeetingTimeOptionCard
            key={recommendInfo.startDate + index}
            isSelected={selectedMeeting === index}
            onSelect={() => setSelectedMeeting(index)}
            attendeeCount={attendeeNames.length}
            schedule={recommendInfo}
          />
        ))}
    </div>
  );
}
