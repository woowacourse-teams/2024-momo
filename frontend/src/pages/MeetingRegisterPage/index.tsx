import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { AuthContext } from '@contexts/AuthProvider';

import MeetingConfirmCalendar from '@components/MeetingConfirmCalendar';
import SchedulePickerContainer from '@components/Schedules/SchedulePicker/SchedulePickerContainer';
import Text from '@components/_common/Text';

import type { MeetingType } from '@apis/meetings';

import { useGetMeetingQuery } from '@stores/servers/meeting/queries';

import { s_container, s_contentDivider, s_pageHeader } from './MeetingRegisterPage.styles';

const MEETING_QUERY_PAGE_ATTRIBUTES = {
  timePick: ' 약속에\n참여할 수 있는 시간을 알려주세요',
};

export default function MeetingRegisterPage() {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;
  const {
    state: { userName },
  } = useContext(AuthContext);

  const { data: meetingFrame } = useGetMeetingQuery(uuid);

  const renderMeetingFrame = (meetingType: MeetingType) => {
    if (!meetingFrame) return;

    switch (meetingType) {
      case 'DATETIME':
        return (
          <SchedulePickerContainer
            firstTime={meetingFrame.firstTime}
            lastTime={meetingFrame.lastTime}
            availableDates={meetingFrame.availableDates}
            type="register"
          />
        );
      default:
        return <MeetingConfirmCalendar.Picker availableDates={meetingFrame.availableDates} />;
    }
  };

  return (
    <div css={s_container} aria-label="약속 정보 조회 페이지">
      <section css={s_pageHeader}>
        {userName !== '' && (
          <Text>
            <Text.Accent text={userName} />님 반가워요 👋🏻
          </Text>
        )}
        <Text typo="titleBold">
          <Text.Accent text={meetingFrame?.meetingName ?? ''} />
          {MEETING_QUERY_PAGE_ATTRIBUTES.timePick}
        </Text>
        <div css={s_contentDivider}></div>
      </section>
      {meetingFrame && renderMeetingFrame(meetingFrame.type)}
    </div>
  );
}
