import { useParams } from 'react-router-dom';
import type { MeetingDateTime } from 'types/meeting';

import { useGetMyScheduleQuery } from '@stores/servers/meeting/queries';

import SchedulePicker from '.';

export default function SchedulePickerContainer({
  firstTime,
  lastTime,
  availableDates,
}: MeetingDateTime) {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;
  const { data: meetingSchedules } = useGetMyScheduleQuery(uuid);

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
