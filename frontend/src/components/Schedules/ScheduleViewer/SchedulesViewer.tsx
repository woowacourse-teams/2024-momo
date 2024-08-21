import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { MeetingDateTime } from 'types/meeting';

import { AuthContext } from '@contexts/AuthProvider';
import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import {
  s_attendeesContainer,
  s_tabButton,
} from '@pages/MeetingTimePickPage/MeetingTimePickPage.styles';

import useSelectSchedule from '@hooks/useSelectSchedule/useSelectSchedule';

import {
  s_buttonContainer,
  s_datesControlButton,
  s_datesControlButtonContainer,
  s_relativeContainer,
} from '../Schedules.styles';
import ScheduleTable from './ScheduleTable';

interface SchedulesViewerProps extends MeetingDateTime {
  isLocked: boolean;
  meetingAttendees: string[];
}

export default function SchedulesViewer({
  isLocked,
  firstTime,
  lastTime,
  availableDates,
  meetingAttendees,
}: SchedulesViewerProps) {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const navigate = useNavigate();

  const { handleToggleIsTimePickerUpdate } = useContext(TimePickerUpdateStateContext);
  const { isLoggedIn } = useContext(AuthContext).state;

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

  const handleScheduleUpdate = () => {
    if (!isLoggedIn) {
      alert('로그인 해주세요');
      navigate(`/meeting/${uuid}/login`);
      return;
    }

    handleToggleIsTimePickerUpdate();
  };

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
      <div css={s_relativeContainer}>
        {/* 버튼 관련 스타일은 다음 이슈에서 해결 예정(@해리) */}
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
        <ScheduleTable
          firstTime={firstTime}
          lastTime={lastTime}
          currentDates={currentDates}
          meetingAttendees={meetingAttendees}
          selectedAttendee={selectedAttendee}
        />
      </div>
      <div css={s_buttonContainer}>
        <button disabled={isLocked} onClick={handleScheduleUpdate}>
          수정하기
        </button>
      </div>
    </>
  );
}
