import { useContext } from 'react';
import type { MeetingDateTime } from 'types/meeting';

import { AuthContext } from '@contexts/AuthProvider';
import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';
import { UuidContext } from '@contexts/UuidProvider';

import { Button } from '@components/_common/Buttons/Button';
import TabButton from '@components/_common/Buttons/TabButton';
import MeetingLockConfirmModal from '@components/_common/Modal/MeetingLockConfirmModal';
import Text from '@components/_common/Text';

import useConfirmModal from '@hooks/useConfirmModal/useConfirmModal';
import useRouter from '@hooks/useRouter/useRouter';
import useSelectSchedule from '@hooks/useSelectSchedule/useSelectSchedule';

import { useLockMeetingMutation } from '@stores/servers/meeting/mutations';
import { formatAriaTab } from '@utils/a11y';

import Check from '@assets/images/attendeeCheck.svg';
import Pen from '@assets/images/pen.svg';

import DateControlButtons from '../DateControlButtons';
import ScheduleOverview from '../ScheduleOverview';
import {
  s_attendeesContainer,
  s_bottomFixedButtonContainer,
  s_circleButton,
  s_fullButtonContainer,
  s_relativeContainer,
} from '../Schedules.styles';
import ScheduleTable from './ScheduleTable';

interface SchedulesViewerProps extends MeetingDateTime {
  isLocked: boolean;
  hostName: string;
  meetingAttendees: string[];
}

export default function SchedulesViewer({
  isLocked,
  firstTime,
  lastTime,
  hostName,
  availableDates,
  meetingAttendees,
}: SchedulesViewerProps) {
  const { routeTo } = useRouter();
  const { uuid } = useContext(UuidContext);

  const { handleToggleIsTimePickerUpdate } = useContext(TimePickerUpdateStateContext);
  const { isLoggedIn, userName } = useContext(AuthContext).state;

  const { mutate: lockMutate } = useLockMeetingMutation();
  const { isConfirmModalOpen, onToggleConfirmModal } = useConfirmModal();

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
      routeTo(`/meeting/${uuid}/login`);
      return;
    }

    handleToggleIsTimePickerUpdate();
  };

  const routerToMeetingConfirmPage = () => routeTo(`/meeting/${uuid}/confirm`);

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
    <>
      <section css={s_attendeesContainer} aria-label="약속 참가자들 정보">
        <TabButton
          tabButtonVariants="outlinedFloating"
          onClick={() => handleAttendeeChange('')}
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
            onClick={() => handleAttendeeChange(attendee)}
            isActive={selectedAttendee === attendee}
            aria-label={formatAriaTab(attendee, selectedAttendee === attendee)}
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
          {hostName === userName ? (
            <Button size="full" variant="primary" onClick={handleConfirmPageRoute}>
              약속 시간 확정하러 가기
            </Button>
          ) : (
            <Button
              size="full"
              variant="primary"
              onClick={() => routeTo(`/meeting/${uuid}/recommend`)}
            >
              약속 시간 추천받으러 가기
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
  );
}
