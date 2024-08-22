import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import type { MeetingDateTime } from 'types/meeting';

import { AuthContext } from '@contexts/AuthProvider';

import { useGetMyScheduleQuery } from '@stores/servers/meeting/queries';

import SchedulePicker from '.';

export default function SchedulePickerContainer({
  firstTime,
  lastTime,
  availableDates,
}: MeetingDateTime) {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;
  const { userName } = useContext(AuthContext).state;
  const { data: meetingSchedules } = useGetMyScheduleQuery(uuid, userName);

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
