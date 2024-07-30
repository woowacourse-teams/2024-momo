import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';

import { getMeetingMySchedule } from '@apis/getMeetingSchedules';

import { QUERY_KEY } from '@constants/queryKeys';

import TimePicker from '.';

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
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;
  const { data: meetingSchedules } = useQuery({
    queryKey: [QUERY_KEY.meetingMySchedule],
    queryFn: () => getMeetingMySchedule(uuid),
    staleTime: 0,
  });

  return meetingSchedules ? (
    <TimePicker
      firstTime={firstTime}
      lastTime={lastTime}
      availableDates={availableDates}
      meetingSchedules={meetingSchedules}
    />
  ) : (
    <></>
  );
}
