import { useContext } from 'react';
import type { MeetingAllSchedules, MeetingSingleSchedule } from 'types/schedule';

import { UuidContext } from '@contexts/UuidProvider';

import ScheduleDateDayList from '@components/Schedules/ScheduleTableFrame/ScheduleDateDayList';
import ScheduleTimeList from '@components/Schedules/ScheduleTableFrame/ScheduleTimeList';

import { useGetSchedules } from '@stores/servers/schedule/queries';

import {
  s_scheduleTable,
  s_scheduleTableBody,
  s_scheduleTableContainer,
} from '../Schedules.styles';
import AllSchedules from './AllSchedules';
import SingleSchedule from './SingleSchedule';

interface ScheduleTableProps {
  firstTime: string;
  lastTime: string;
  currentDates: string[];
  meetingAttendees: string[];
  selectedAttendee: string;
}

export default function ScheduleTable({
  firstTime,
  lastTime,
  currentDates,
  meetingAttendees,
  selectedAttendee,
}: ScheduleTableProps) {
  const { uuid } = useContext(UuidContext);

  const { data: meetingSchedules } = useGetSchedules(uuid, selectedAttendee);

  return (
    <section css={s_scheduleTableContainer}>
      <ScheduleTimeList firstTime={firstTime} lastTime={lastTime} />
      <table css={s_scheduleTable} aria-label="약속 시간 조회 테이블">
        <thead>
          <ScheduleDateDayList availableDates={currentDates} />
        </thead>
        <tbody css={s_scheduleTableBody}>
          {selectedAttendee === ''
            ? meetingSchedules && (
                <AllSchedules
                  firstTime={firstTime}
                  lastTime={lastTime}
                  availableDates={currentDates}
                  meetingAttendees={meetingAttendees}
                  meetingAllSchedules={meetingSchedules as MeetingAllSchedules}
                />
              )
            : meetingSchedules && (
                <SingleSchedule
                  firstTime={firstTime}
                  lastTime={lastTime}
                  availableDates={currentDates}
                  meetingSingleSchedule={meetingSchedules as MeetingSingleSchedule}
                />
              )}
        </tbody>
      </table>
    </section>
  );
}
