import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import type { MeetingAllSchedules, MeetingSingleSchedule } from 'types/meeting';

import {
  s_attendeesContainer,
  s_tabButton,
} from '@pages/MeetingTimePickPage/MeetingTimePickPage.styles';

import { handleGetMeetingSchedules } from '@apis/getMeetingSchedules';

import { QUERY_KEY } from '@constants/queryKeys';

import AllSchedules from './AllSchdules';
import SingleSchedule from './SingleSchedule';

interface SchedulesViewerProps {
  firstTime: string;
  lastTime: string;
  availableDates: string[];
  meetingAttendees: string[];
}

export default function SchedulesViewer({
  firstTime,
  lastTime,
  availableDates,
  meetingAttendees,
}: SchedulesViewerProps) {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const [selectedAttendee, setSelectedAttendee] = useState('');
  const handleAttendeeChange = (attendee: string) => {
    if (selectedAttendee === attendee) return;
    setSelectedAttendee(attendee);
  };

  const { data: meetingSchedules } = useQuery({
    queryKey: [QUERY_KEY.meetingSchedules, selectedAttendee],
    queryFn: () => handleGetMeetingSchedules({ uuid, attendeeName: selectedAttendee }),
    staleTime: 0,
  });

  return (
    <>
      <section css={s_attendeesContainer} aria-label="약속 참가자들 정보">
        <button css={s_tabButton(true)} onClick={() => handleAttendeeChange('')}>
          전체
        </button>
        {meetingAttendees.map((attendee) => (
          <button
            key={attendee}
            css={s_tabButton(true)}
            onClick={() => handleAttendeeChange(attendee)}
          >
            {attendee}
          </button>
        ))}
      </section>
      {selectedAttendee === '' ? (
        <AllSchedules
          firstTime={firstTime}
          lastTime={lastTime}
          availableDates={availableDates}
          allSchedules={meetingSchedules as MeetingAllSchedules}
        />
      ) : (
        <SingleSchedule
          firstTime={firstTime}
          lastTime={lastTime}
          availableDates={availableDates}
          singleSchedule={meetingSchedules as MeetingSingleSchedule}
        />
      )}
    </>
  );
}
