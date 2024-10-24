import { useContext } from 'react';
import type { MeetingDateTime } from 'types/meeting';
import type { Mode } from 'types/schedule';

import { AuthContext } from '@contexts/AuthProvider';
import { UuidContext } from '@contexts/UuidProvider';

import { useGetMyScheduleQuery } from '@stores/servers/schedule/queries';

import SchedulePicker from '.';

interface SchedulePickerContainerProps extends MeetingDateTime {
  mode: Mode;
}

export default function SchedulePickerContainer({
  firstTime,
  lastTime,
  availableDates,
  mode,
}: SchedulePickerContainerProps) {
  const { uuid } = useContext(UuidContext);
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
        mode={mode}
      />
    )
  );
}
