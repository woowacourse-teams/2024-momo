import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getMeetingMySchedule } from '@apis/schedules';

import { QUERY_KEY } from '@constants/queryKeys';

import SchedulePicker from '.';

interface SchedulePickerContainerProps {
  firstTime: string;
  lastTime: string;
  availableDates: string[];
}

export default function SchedulePickerContainer({
  firstTime,
  lastTime,
  availableDates,
}: SchedulePickerContainerProps) {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;
  const { data: meetingSchedules } = useQuery({
    queryKey: [QUERY_KEY.meetingMySchedule],
    queryFn: () => getMeetingMySchedule(uuid),
    staleTime: 0,
  });

  return (
    meetingSchedules &&
    meetingSchedules.attendeeName !== '' && (
      <SchedulePicker
        firstTime={firstTime}
        lastTime={lastTime}
        availableDates={availableDates}
        meetingSchedules={meetingSchedules}
      />
    )
  );
}
