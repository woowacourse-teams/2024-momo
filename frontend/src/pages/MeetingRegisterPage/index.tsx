import { useContext } from 'react';

import ContentLayout from '@layouts/ContentLayout';

import { AuthContext } from '@contexts/AuthProvider';
import { UuidContext } from '@contexts/UuidProvider';

import MeetingConfirmCalendar from '@components/MeetingConfirmCalendar';
import SchedulePickerContainer from '@components/Schedules/SchedulePicker/SchedulePickerContainer';
import BackButton from '@components/_common/Buttons/BackButton';
import Header from '@components/_common/Header';
import Text from '@components/_common/Text';

import type { MeetingType } from '@apis/meetings/meetings';

import { useGetMeetingQuery } from '@stores/servers/meeting/queries';

import { s_container, s_contentDivider, s_pageHeader } from './MeetingRegisterPage.styles';

const MEETING_QUERY_PAGE_ATTRIBUTES = {
  timePick: ' 약속에\n참여할 수 있는 시간을 알려주세요',
};

export default function MeetingRegisterPage() {
  const { uuid } = useContext(UuidContext);

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
            mode="register"
          />
        );
      default:
        return (
          <MeetingConfirmCalendar.Picker
            availableDates={meetingFrame.availableDates}
            mode="register"
          />
        );
    }
  };

  return (
    <>
      <Header title="약속 등록하기">
        <BackButton path={`/meeting/${uuid}`} />
      </Header>
      <ContentLayout>
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
      </ContentLayout>
    </>
  );
}
