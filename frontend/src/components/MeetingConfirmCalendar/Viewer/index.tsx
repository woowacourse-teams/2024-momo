import { useContext, useState } from 'react';
import type { MeetingAllSchedules, MeetingSingleSchedule } from 'types/schedule';

import { AuthContext } from '@contexts/AuthProvider';
import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';
import { UuidContext } from '@contexts/UuidProvider';

import { s_attendeesContainer } from '@pages/MeetingConfirmPage/MeetingTimeConfirmPage.styles';

import {
  s_bottomFixedButtonContainer,
  s_circleButton,
  s_fullButtonContainer,
} from '@components/Schedules/Schedules.styles';
import { Button } from '@components/_common/Buttons/Button';
import TabButton from '@components/_common/Buttons/TabButton';
import Calendar from '@components/_common/Calendar';
import MeetingLockConfirmModal from '@components/_common/Modal/MeetingLockConfirmModal';
import ScreenReaderOnly from '@components/_common/ScreenReaderOnly';
import Text from '@components/_common/Text';

import useConfirmModal from '@hooks/useConfirmModal/useConfirmModal';
import useRouter from '@hooks/useRouter/useRouter';

import { useLockMeetingMutation } from '@stores/servers/meeting/mutations';
import { useGetSchedules } from '@stores/servers/schedule/queries';

import { formatAriaTab } from '@utils/a11y';
import { getFullDate, hasSelectableDaysInMonth } from '@utils/date';

import Check from '@assets/images/attendeeCheck.svg';
import Pen from '@assets/images/pen.svg';

import Header from '../Header';
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
  const { routeTo } = useRouter();
  const { uuid } = useContext(UuidContext);
  const [selectedAttendee, setSelectedAttendee] = useState('');

  const { data: meetingSchedules } = useGetSchedules(uuid, selectedAttendee);
  const { handleToggleIsTimePickerUpdate } = useContext(TimePickerUpdateStateContext);
  const { isLoggedIn, userName } = useContext(AuthContext).state;

  const { isConfirmModalOpen, onToggleConfirmModal } = useConfirmModal();
  const { mutate: lockMutate } = useLockMeetingMutation();

  const routerToMeetingConfirmPage = () => routeTo(`/meeting/${uuid}/confirm`);

  const handleScheduleUpdate = () => {
    if (!isLoggedIn) {
      alert('로그인 해주세요');
      routeTo(`/meeting/${uuid}/login`);
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

  const handleConfirmPageRoute = () => {
    if (!isLocked) {
      onToggleConfirmModal();
      return;
    }

    routerToMeetingConfirmPage();
  };

  const handleMeetingLockWithRoute = () => {
    lockMutate(uuid);
    routerToMeetingConfirmPage();
  };

  return (
    meetingSchedules && (
      <>
        <section css={s_attendeesContainer} aria-label="약속 참가자들 정보">
          <TabButton
            tabButtonVariants="outlinedFloating"
            onClick={() => setSelectedAttendee('')}
            isActive={selectedAttendee === ''}
            aria-label={formatAriaTab('전체', selectedAttendee === '')}
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
              aria-label={formatAriaTab(attendee, selectedAttendee === attendee)}
            >
              {selectedAttendee === attendee && <Check width="12" height="12" />}
              {attendee}
            </TabButton>
          ))}
        </section>

        <Calendar>
          <Calendar.Header
            render={(props) => (
              <Header {...props}>
                <ScreenReaderOnly>
                  {hasSelectableDaysInMonth(
                    props.currentMonth,
                    meetingSchedules.schedules.map(({ date }) => date),
                  )
                    ? '선택 가능한 날이 있습니다.'
                    : '선택 가능한 날이 없습니다.'}
                </ScreenReaderOnly>
              </Header>
            )}
          />
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
              <Button size="full" variant="primary" onClick={handleConfirmPageRoute}>
                약속 시간 확정하기
              </Button>
            ) : (
              <Button
                size="full"
                variant="primary"
                onClick={() => routeTo(`/meeting/${uuid}/recommend`)}
              >
                약속 시간 추천받기
              </Button>
            )}
          </div>
          <button
            disabled={isLocked}
            onClick={handleScheduleUpdate}
            css={s_circleButton}
            aria-label="약속 수정하기"
          >
            <Pen width="28" height="28" />
          </button>
        </footer>

        <MeetingLockConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={onToggleConfirmModal}
          onConfirm={handleMeetingLockWithRoute}
          onSecondButtonClick={routerToMeetingConfirmPage}
          title="약속 잠금 결정"
          size="small"
          position="center"
          buttonPosition="column"
        >
          <Text variant="default" typo="captionMedium">
            약속을 확정하기 위해서는 우선
            <Text.Accent text=" 약속을 잠가야 합니다" />
          </Text>
          <Text variant="default" typo="captionMedium">
            약속을 잠그고 약속 확정 페이지로 이동할까요?
          </Text>
        </MeetingLockConfirmModal>
      </>
    )
  );
}
