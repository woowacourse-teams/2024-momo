import MeetingDateTime from '@pages/CreateMeetingFunnelPage/MeetingDateTime';
import MeetingHostInfo from '@pages/CreateMeetingFunnelPage/MeetingHostInfo';
import MeetingName from '@pages/CreateMeetingFunnelPage/MeetingName';

import useCreateMeeting from '@hooks/useCreateMeeting/useCreateMeeting';
import useFunnel from '@hooks/useFunnel/useFunnel';

const testSteps = ['약속이름', '약속주최자정보', '약속날짜시간정보'] as const;
type TestSteps = typeof testSteps;

export default function FunnelTestPage() {
  const [setStep, Funnel] = useFunnel<TestSteps>(testSteps, '약속이름');
  const {
    meetingNameInput,
    isMeetingNameInvalid,
    hostNickNameInput,
    hostPasswordInput,
    isHostInfoInValid,
    hasDate,
    handleDateClick,
    meetingTimeInput,
    isCreateMeetingFormInValid,
  } = useCreateMeeting();

  return (
    <Funnel>
      <Funnel.Step name="약속이름">
        <MeetingName
          meetingNameInput={meetingNameInput}
          isMeetingNameInvalid={isMeetingNameInvalid}
          onNextStep={() => setStep('약속주최자정보')}
        />
      </Funnel.Step>
      <Funnel.Step name="약속주최자정보">
        <MeetingHostInfo
          hostNickNameInput={hostNickNameInput}
          hostPasswordInput={hostPasswordInput}
          isHostInfoInvalid={isHostInfoInValid}
          onNextStep={() => setStep('약속날짜시간정보')}
        />
      </Funnel.Step>
      <Funnel.Step name="약속날짜시간정보">
        <MeetingDateTime
          meetingDateInput={{ hasDate, onDateClick: handleDateClick }}
          meetingTimeInput={meetingTimeInput}
          isCreateMeetingFormInValid={isCreateMeetingFormInValid}
        />
      </Funnel.Step>
    </Funnel>
  );
}
