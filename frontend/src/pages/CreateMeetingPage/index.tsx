import { useNavigate } from 'react-router-dom';

import ContentLayout from '@layouts/ContentLayout/ContentLayout';

import MeetingDateTime from '@pages/CreateMeetingPage/components/MeetingDateTime';
import MeetingHostInfo from '@pages/CreateMeetingPage/components/MeetingHostInfo';
import MeetingName from '@pages/CreateMeetingPage/components/MeetingName';

import Header from '@components/_common/Header';
import { s_backButton } from '@components/_common/Header/Header.styles';

import useConfirmModal from '@hooks/useConfirmModal/useConfirmModal';
import useCreateMeeting from '@hooks/useCreateMeeting/useCreateMeeting';
import useFunnel from '@hooks/useFunnel/useFunnel';

import BackSVG from '@assets/images/back.svg';

import { CREATE_MEETING_STEPS, meetingStepValues } from '@constants/meeting';

import MeetingCreationConfirmModal from './components/MeetingCreationConfirmModal';

type Steps = typeof meetingStepValues;

export default function CreateMeetingPage() {
  const { isConfirmModalOpen, onToggleConfirmModal } = useConfirmModal();

  const navigate = useNavigate();
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
      <Header title="약속 만들기">
        <button css={s_backButton} onClick={() => navigate(-1)}>
          <BackSVG width="24" height="24" />
        </button>
      </Header>
      <ContentLayout>
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
              onMeetingCreateButtonClick={handleMeetingCreateButtonClick}
            />
          </Funnel.Step>
        </Funnel>
        {/* BottomFixedButton이 요소를 가리는 현상이 있어 버튼 높이(6rem)와 같은 크기의 div 요소 배치  */}
        <div style={{ width: '100%', height: '6rem' }}></div>
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
      </ContentLayout>
    </>
  );
}
