import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { MeetingDateTime } from 'types/meeting';

import { AuthContext } from '@contexts/AuthProvider';
import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import { s_attendeesContainer } from '@pages/MeetingTimePickPage/MeetingTimePickPage.styles';

import { Button } from '@components/_common/Buttons/Button';
import TabButton from '@components/_common/Buttons/TabButton';

import useSelectSchedule from '@hooks/useSelectSchedule/useSelectSchedule';

import Check from '@assets/images/attendeeCheck.svg';
import Pen from '@assets/images/pen.svg';

import DateControlButtons from '../DateControlButtons';
import ScheduleOverview from '../ScheduleOverview';
import {
  s_bottomFixedButtonContainer,
  s_circleButton,
  s_fullButtonContainer,
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
        <TabButton
          tabButtonVariants="outlinedFloating"
          onClick={() => handleAttendeeChange('')}
          isActive={selectedAttendee === ''}
        >
          {selectedAttendee === '' && <Check width="12" height="12" />}
          전체
        </TabButton>
        {meetingAttendees.map((attendee) => (
          <TabButton
            key={attendee}
            tabButtonVariants="outlinedFloating"
            onClick={() => handleAttendeeChange(attendee)}
            isActive={selectedAttendee === attendee}
          >
            {selectedAttendee === attendee && <Check width="12" height="12" />}
            {attendee}
          </TabButton>
        ))}
      </section>
      <ScheduleOverview selectedAttendee={selectedAttendee} />
      <div css={s_relativeContainer}>
        {isMultiPage && (
          <DateControlButtons
            decreaseDatePage={decreaseDatePage}
            increaseDatePage={increaseDatePage}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
          />
        )}
        <ScheduleTable
          firstTime={firstTime}
          lastTime={lastTime}
          currentDates={currentDates}
          meetingAttendees={meetingAttendees}
          selectedAttendee={selectedAttendee}
        />
      </div>
      <footer css={s_bottomFixedButtonContainer}>
        <div css={s_fullButtonContainer}>
          <Button size="full" variant="primary" onClick={() => navigate('recommend')}>
            약속 시간 추천받기
          </Button>
        </div>
        <button disabled={isLocked} onClick={handleScheduleUpdate} css={s_circleButton}>
          <Pen width="28" height="28" />
        </button>
      </footer>
    </>
  );
}
