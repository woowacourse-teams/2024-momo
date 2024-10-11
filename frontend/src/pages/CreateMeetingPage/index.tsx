import MeetingDateTime from '@pages/CreateMeetingPage/components/MeetingDateTime';
import MeetingHostInfo from '@pages/CreateMeetingPage/components/MeetingHostInfo';
import MeetingName from '@pages/CreateMeetingPage/components/MeetingName';

import useCreateMeeting from '@hooks/useCreateMeeting/useCreateMeeting';
import useFunnel from '@hooks/useFunnel/useFunnel';

import { CREATE_MEETING_STEPS, meetingStepValues } from '@constants/meeting';

type Steps = typeof meetingStepValues;

export default function CreateMeetingPage() {
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
  );
}
