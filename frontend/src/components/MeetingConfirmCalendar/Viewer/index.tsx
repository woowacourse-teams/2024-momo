import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { MeetingAllSchedules, MeetingSingleSchedule } from 'types/schedule';

import { AuthContext } from '@contexts/AuthProvider';
import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import { s_attendeesContainer } from '@pages/MeetingConfirmPage/MeetingTimeConfirmPage.styles';

import {
  s_bottomFixedButtonContainer,
  s_circleButton,
  s_fullButtonContainer,
} from '@components/Schedules/Schedules.styles';
import { Button } from '@components/_common/Buttons/Button';
import TabButton from '@components/_common/Buttons/TabButton';
import Calendar from '@components/_common/Calendar';

import { useGetSchedules } from '@stores/servers/schedule/queries';

import { getFullDate } from '@utils/date';

import Check from '@assets/images/attendeeCheck.svg';
import Pen from '@assets/images/pen.svg';

import Header from '../Header/Header';
import SingleDateViewer from '../SingleDate/SingleDateViewer';
import WeekDays from '../WeekDays';

interface ViewerProps {
  availableDates: string[];
  meetingAttendees: string[];
  hostName: string;
  isLocked: boolean;
}

export default function Viewer({
  availableDates,
  meetingAttendees,
  hostName,
  isLocked,
}: ViewerProps) {
  const navigate = useNavigate();
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;
  const [selectedAttendee, setSelectedAttendee] = useState('');

  const { data: meetingSchedules } = useGetSchedules(uuid, selectedAttendee);
  const { handleToggleIsTimePickerUpdate } = useContext(TimePickerUpdateStateContext);
  const { isLoggedIn, userName } = useContext(AuthContext).state;

  const handleScheduleUpdate = () => {
    if (!isLoggedIn) {
      alert('로그인 해주세요');
      navigate(`/meeting/${uuid}/login`);
      return;
    }

    handleToggleIsTimePickerUpdate();
  };

  const availableAttendees = (currentDate: string) => {
    if (!meetingSchedules) return;

    if (selectedAttendee === '') {
      const schedules = meetingSchedules as MeetingAllSchedules;

      return schedules.schedules.find(({ date }) => date === currentDate)?.attendeeNames;
    } else {
      const schedules = meetingSchedules as MeetingSingleSchedule;

      return schedules.schedules.map(({ date }) => date).includes(currentDate)
        ? [schedules.attendeeName]
        : undefined;
    }
  };

  return (
    meetingSchedules && (
      <>
        <section css={s_attendeesContainer} aria-label="약속 참가자들 정보">
          <TabButton
            tabButtonVariants="outlinedFloating"
            onClick={() => setSelectedAttendee('')}
            isActive={selectedAttendee === ''}
          >
            {selectedAttendee === '' && <Check width="12" height="12" />}
            전체
          </TabButton>
          {meetingAttendees.map((attendee) => (
            <TabButton
              key={attendee}
              tabButtonVariants="outlinedFloating"
              onClick={() => setSelectedAttendee(attendee)}
              isActive={selectedAttendee === attendee}
            >
              {selectedAttendee === attendee && <Check width="12" height="12" />}
              {attendee}
            </TabButton>
          ))}
        </section>

        <Calendar>
          <Calendar.Header render={(props) => <Header {...props} />} />
          <Calendar.WeekDays render={(weekdays) => <WeekDays weekdays={weekdays} />} />
          <Calendar.Body
            renderDate={(dateInfo, today) => (
              <SingleDateViewer
                key={dateInfo.key}
                selectAttendee={selectedAttendee}
                availableAttendees={availableAttendees(getFullDate(dateInfo.value))}
                dateInfo={dateInfo}
                today={today}
                isAvailable={availableDates.includes(getFullDate(dateInfo.value))}
              />
            )}
          />
        </Calendar>

        <footer css={s_bottomFixedButtonContainer}>
          <div css={s_fullButtonContainer}>
            {hostName === userName ? (
              <Button size="full" variant="primary" onClick={() => navigate('confirm')}>
                약속 시간 확정하기
              </Button>
            ) : (
              <Button size="full" variant="primary" onClick={() => navigate('recommend')}>
                약속 시간 추천받기
              </Button>
            )}
          </div>
          <button disabled={isLocked} onClick={handleScheduleUpdate} css={s_circleButton}>
            <Pen width="28" height="28" />
          </button>
        </footer>
      </>
    )
  );
}
