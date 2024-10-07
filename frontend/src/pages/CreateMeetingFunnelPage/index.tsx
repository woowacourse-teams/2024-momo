import MeetingDateTime from '@pages/CreateMeetingFunnelPage/MeetingDateTime';
import MeetingHostInfo from '@pages/CreateMeetingFunnelPage/MeetingHostInfo';
import MeetingName from '@pages/CreateMeetingFunnelPage/MeetingName';

import useCreateMeeting from '@hooks/useCreateMeeting/useCreateMeeting';
import useFunnel from '@hooks/useFunnel/useFunnel';

import { CREATE_MEETING_STEPS, meetingStepValues } from '@constants/meeting';

type Steps = typeof meetingStepValues;

export default function FunnelTestPage() {
  const [setStep, Funnel] = useFunnel<Steps>(meetingStepValues, '약속이름');
  const {
    meetingNameInput,
    isMeetingNameInvalid,
    hostNickNameInput,
    hostPasswordInput,
    isHostInfoInvalid,
    hasDate,
    handleDateClick,
    meetingTimeInput,
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
          meetingDateInput={{ hasDate, onDateClick: handleDateClick }}
          meetingTimeInput={meetingTimeInput}
          isCreateMeetingFormInvalid={isCreateMeetingFormInvalid}
          onMeetingCreateButtonClick={handleMeetingCreateButtonClick}
        />
      </Funnel.Step>
    </Funnel>
  );
}
