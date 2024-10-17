import MeetingDateTime from '@pages/CreateMeetingPage/components/MeetingDateTime';
import MeetingHostInfo from '@pages/CreateMeetingPage/components/MeetingHostInfo';
import MeetingName from '@pages/CreateMeetingPage/components/MeetingName';

import useConfirmModal from '@hooks/useConfirmModal/useConfirmModal';
import useCreateMeeting from '@hooks/useCreateMeeting/useCreateMeeting';
import useFunnel from '@hooks/useFunnel/useFunnel';

import { CREATE_MEETING_STEPS, meetingStepValues } from '@constants/meeting';

import MeetingCreationConfirmModal from './components/MeetingCreationConfirmModal';

type Steps = typeof meetingStepValues;

export default function CreateMeetingPage() {
  const { isConfirmModalOpen, onToggleConfirmModal } = useConfirmModal();

  const [setStep, Funnel] = useFunnel<Steps>(meetingStepValues, '약속이름');

  const {
    meetingNameInput,
    isMeetingNameInvalid,
    hostNickNameInput,
    hostPasswordInput,
    isHostInfoInvalid,
    meetingDateInput,
    meetingTimeInput,
    meetingTypeInput,
    isCreateMeetingFormInvalid,
    handleMeetingCreateButtonClick,
  } = useCreateMeeting();

  return (
    <>
      <Funnel>
        <Funnel.Step name={CREATE_MEETING_STEPS.meetingName}>
          <MeetingName
            meetingNameInput={meetingNameInput}
            isMeetingNameInvalid={isMeetingNameInvalid}
            onNextStep={() => setStep(CREATE_MEETING_STEPS.meetingHostInfo)}
          />
        </Funnel.Step>
        <Funnel.Step name={CREATE_MEETING_STEPS.meetingHostInfo}>
          <MeetingHostInfo
            hostNickNameInput={hostNickNameInput}
            hostPasswordInput={hostPasswordInput}
            isHostInfoInvalid={isHostInfoInvalid}
            onNextStep={() => setStep(CREATE_MEETING_STEPS.meetingDateTime)}
          />
        </Funnel.Step>
        <Funnel.Step name={CREATE_MEETING_STEPS.meetingDateTime}>
          <MeetingDateTime
            meetingDateInput={meetingDateInput}
            meetingTimeInput={meetingTimeInput}
            meetingTypeInput={meetingTypeInput}
            isCreateMeetingFormInvalid={isCreateMeetingFormInvalid}
            onMeetingCreateButtonClick={onToggleConfirmModal}
          />
        </Funnel.Step>
      </Funnel>
      <MeetingCreationConfirmModal
        isModalOpen={isConfirmModalOpen}
        onModalClose={onToggleConfirmModal}
        onModalConfirmButtonClick={handleMeetingCreateButtonClick}
        meetingName={meetingNameInput.value}
        hostName={hostNickNameInput.value}
        selectedDates={Array.from(meetingDateInput.selectedDates)}
        startTime={meetingTimeInput.startTime.value}
        endTime={meetingTimeInput.endTime.value}
        isOnlyDaysOptionChecked={meetingTypeInput.isChecked}
      />
    </>
  );
}
