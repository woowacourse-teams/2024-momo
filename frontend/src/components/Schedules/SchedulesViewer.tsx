import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import {
  s_attendeesContainer,
  s_tabButton,
} from '@pages/MeetingTimePickPage/MeetingTimePickPage.styles';

import useSelectSchedule from '@hooks/useSelectSchedule/useSelectSchedule';

import type { MeetingAllSchedules, MeetingSingleSchedule } from '@apis/schedules';
import { handleGetMeetingSchedules } from '@apis/schedules';

import { QUERY_KEY } from '@constants/queryKeys';

import AllSchedules from './AllSchedule';
import {
  s_buttonContainer,
  s_datesControlButton,
  s_datesControlButtonContainer,
} from './Schedules.styles';
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

  const { handleToggleIsTimePickerUpdate } = useContext(TimePickerUpdateStateContext);

  const {
    currentDates,
    increaseDatePage,
    decreaseDatePage,
    isMultiPage,
    isFirstPage,
    isLastPage,
    selectedAttendee,
    handleAttendeeChange,
  } = useSelectSchedule(availableDates);

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
      <section
        css={css`
          position: relative;
        `}
      >
        {isMultiPage && (
          <div css={s_datesControlButtonContainer}>
            <button
              css={s_datesControlButton}
              onClick={() => decreaseDatePage()}
              disabled={isFirstPage}
            >
              {'<'}
            </button>
            <button
              css={s_datesControlButton}
              onClick={() => increaseDatePage()}
              disabled={isLastPage}
            >
              {'>'}
            </button>
          </div>
        )}
        {selectedAttendee === '' ? (
          <AllSchedules
            firstTime={firstTime}
            lastTime={lastTime}
            availableDates={currentDates}
            allSchedules={meetingSchedules as MeetingAllSchedules}
          />
        ) : (
          <SingleSchedule
            firstTime={firstTime}
            lastTime={lastTime}
            availableDates={currentDates}
            singleSchedule={meetingSchedules as MeetingSingleSchedule}
          />
        )}
      </section>
      <div css={s_buttonContainer}>
        <button onClick={handleToggleIsTimePickerUpdate}>수정하기</button>
      </div>
    </>
  );
}
