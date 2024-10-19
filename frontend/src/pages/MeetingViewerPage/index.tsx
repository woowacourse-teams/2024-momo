import { useContext } from 'react';

import ContentLayout from '@layouts/ContentLayout/ContentLayout';

import { AuthContext } from '@contexts/AuthProvider';
import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import MeetingConfirmCalendar from '@components/MeetingConfirmCalendar';
import SchedulePickerContainer from '@components/Schedules/SchedulePicker/SchedulePickerContainer';
import SchedulesViewer from '@components/Schedules/ScheduleViewer/SchedulesViewer';
import ToggleButton from '@components/_common/Buttons/ToggleButton';
import Header from '@components/_common/Header';
import { s_backButton } from '@components/_common/Header/Header.styles';
import Text from '@components/_common/Text';

import useKakaoTalkShare from '@hooks/useKakaoTalkShare/useKakaoTalkShare';
import useRouter from '@hooks/useRouter/useRouter';
import useUuid from '@hooks/useUuid/useUuid';

import type { MeetingType } from '@apis/meetings/meetings';

import {
  useLockMeetingMutation,
  useUnlockMeetingMutation,
} from '@stores/servers/meeting/mutations';
import { useGetMeetingQuery } from '@stores/servers/meeting/queries';

import BackSVG from '@assets/images/back.svg';
import ShareSVG from '@assets/images/share.svg';

import { MEETING_INVITE_TEMPLATE_ID } from '@constants/kakao';

import {
  s_container,
  s_contentDivider,
  s_pageHeader,
  s_toggleButtonContainer,
} from './MeetingViewerPage.styles';

const MEETING_QUERY_PAGE_ATTRIBUTES = {
  overview: ' 약속 참여자들이\n선택한 시간대를 알려드릴게요',
  timePick: ' 약속에\n참여할 수 있는 시간을 알려주세요',
};

export default function MeetingViewerPage() {
  const { routeTo } = useRouter();
  const { handleKakaoTalkShare } = useKakaoTalkShare();
  const { uuid } = useUuid();

  const {
    state: { userName },
  } = useContext(AuthContext);

  const { data: meetingFrame } = useGetMeetingQuery(uuid);
  const { isTimePickerUpdate, handleToggleIsTimePickerUpdate } = useContext(
    TimePickerUpdateStateContext,
  );
  const { mutate: lockMutate } = useLockMeetingMutation();
  const { mutate: unlockMutate } = useUnlockMeetingMutation();

  const handleToggleMeetingLock = (uuid: string) => {
    if (meetingFrame?.isLocked) {
      try {
        unlockMutate(uuid);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    } else {
      try {
        lockMutate(uuid);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    }
  };

  const renderMeetingFrame = (meetingType: MeetingType) => {
    if (!meetingFrame) return;

    switch (meetingType) {
      case 'DATETIME':
        return isTimePickerUpdate ? (
          <SchedulePickerContainer
            firstTime={meetingFrame.firstTime}
            lastTime={meetingFrame.lastTime}
            availableDates={meetingFrame.availableDates}
            mode="edit"
          />
        ) : (
          <SchedulesViewer
            isLocked={meetingFrame.isLocked}
            firstTime={meetingFrame.firstTime}
            lastTime={meetingFrame.lastTime}
            hostName={meetingFrame.hostName}
            availableDates={meetingFrame.availableDates}
            meetingAttendees={meetingFrame.attendeeNames}
          />
        );
      default:
        return isTimePickerUpdate ? (
          <MeetingConfirmCalendar.Picker availableDates={meetingFrame.availableDates} mode="edit" />
        ) : (
          <MeetingConfirmCalendar.Viewer
            hostName={meetingFrame.hostName}
            isLocked={meetingFrame.isLocked}
            meetingAttendees={meetingFrame.attendeeNames}
            availableDates={meetingFrame.availableDates}
          />
        );
    }
  };

  // 뒤로가기 버튼 : Picker상태일 때 업데이트 상태를 false로 만들고, Viewer 상태일 때 약속 입장 페이지로 이동 (@낙타)
  const handleBackButtonClick = (isTimePickerUpdate: boolean) => {
    if (isTimePickerUpdate) handleToggleIsTimePickerUpdate();
    else routeTo(`/meeting/${uuid}`);
  };

  const handleShareButtonClick = () => {
    handleKakaoTalkShare(MEETING_INVITE_TEMPLATE_ID, {
      path: uuid,
      hostName: meetingFrame?.hostName,
      meetingName: meetingFrame?.meetingName,
    });
  };

  return (
    <>
      <Header title={isTimePickerUpdate ? '약속 변경하기' : '약속 현황 조회'}>
        <button css={s_backButton} onClick={() => handleBackButtonClick(isTimePickerUpdate)}>
          <BackSVG width="24" height="24" />
        </button>
        {/* 업데이트 상태가 아닐 때 공유 버튼이 렌더링 되도록 구현 (@낙타) */}
        {!isTimePickerUpdate && (
          <button css={s_backButton} onClick={() => handleShareButtonClick()}>
            <ShareSVG width="24" height="24" />
          </button>
        )}
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
              {isTimePickerUpdate
                ? `${MEETING_QUERY_PAGE_ATTRIBUTES.timePick}`
                : `${MEETING_QUERY_PAGE_ATTRIBUTES.overview}`}
            </Text>
            <div css={s_contentDivider}></div>
            {meetingFrame?.hostName === userName && (
              <div css={s_toggleButtonContainer}>
                <ToggleButton
                  id="toggle-lock-meeting"
                  isToggled={meetingFrame?.isLocked}
                  onClick={() => handleToggleMeetingLock(uuid)}
                >
                  {meetingFrame?.isLocked ? '응답 다시 받기' : '응답 그만 받기'}
                </ToggleButton>
              </div>
            )}
          </section>
          {meetingFrame && renderMeetingFrame(meetingFrame.type)}
        </div>
      </ContentLayout>
    </>
  );
}
