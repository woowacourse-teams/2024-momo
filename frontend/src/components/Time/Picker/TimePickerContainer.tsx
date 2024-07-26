import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { handleGetMeetingSchedules } from '@apis/getMeetingSchedules';

import { QUERY_KEY } from '@constants/queryKeys';

import TimePicker from '.';

const TEST_UUID = '550e8400';

interface TimePickerContainerProps {
  firstTime: string;
  lastTime: string;
  availableDates: string[];
}

export default function TimePickerContainer({
  firstTime,
  lastTime,
  availableDates,
}: TimePickerContainerProps) {
  const attendeeName = localStorage.getItem('meetingAttendee');
  const { data: meetingSchedules } = useQuery({
    queryKey: [QUERY_KEY.meetingSchedules, attendeeName],
    queryFn: () =>
      handleGetMeetingSchedules({ uuid: TEST_UUID, attendeeName: attendeeName as string }),
    staleTime: 0,
  });

  if (!meetingSchedules) return <></>;
  if (!('attendeeName' in meetingSchedules)) return <></>;

  return (
    <TimePicker
      firstTime={firstTime}
      lastTime={lastTime}
      availableDates={availableDates}
      meetingSchedules={meetingSchedules}
    />
  );
}
