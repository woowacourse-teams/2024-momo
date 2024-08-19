import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import type { MeetingDateTime } from 'types/meeting';

import { getMeetingMySchedule } from '@apis/schedules';

import { QUERY_KEY } from '@constants/queryKeys';

import SchedulePicker from '.';

export default function SchedulePickerContainer({
  firstTime,
  lastTime,
  availableDates,
}: MeetingDateTime) {
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
        meetingSingleSchedule={meetingSchedules}
      />
    )
  );
}
