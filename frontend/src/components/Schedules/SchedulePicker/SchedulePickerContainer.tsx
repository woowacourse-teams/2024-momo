import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import type { MeetingDateTime } from 'types/meeting';

import { AuthContext } from '@contexts/AuthProvider';

import { useGetMyScheduleQuery } from '@stores/servers/meeting/queries';

import SchedulePicker from '.';

interface SchedulePickerContainerProps extends MeetingDateTime {
  type: 'register' | 'edit';
}

export default function SchedulePickerContainer({
  firstTime,
  lastTime,
  availableDates,
  type,
}: SchedulePickerContainerProps) {
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
        type={type}
      />
    )
  );
}
