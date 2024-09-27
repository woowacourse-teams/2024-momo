import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { AuthContext } from '@contexts/AuthProvider';
import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import MeetingConfirmCalendar from '@components/MeetingConfirmCalendar';
import SchedulePickerContainer from '@components/Schedules/SchedulePicker/SchedulePickerContainer';
import SchedulesViewer from '@components/Schedules/ScheduleViewer/SchedulesViewer';
import ToggleButton from '@components/_common/Buttons/ToggleButton';
import Text from '@components/_common/Text';

import type { MeetingType } from '@apis/meetings';

import { useLockMeetingMutation, useUnlockMeetingMutation } from '@stores/servers/meeting/mutation';
import { useGetMeetingQuery } from '@stores/servers/meeting/queries';

import {
  s_container,
  s_contentDivider,
  s_pageHeader,
  s_toggleButtonContainer,
} from './MeetingTimePickPage.styles';

const MEETING_QUERY_PAGE_ATTRIBUTES = {
  overview: ' 약속 참여자들이\n선택한 시간대를 알려드릴게요',
  timePick: ' 약속에\n참여할 수 있는 시간을 알려주세요',
};

export default function MeetingTimePickPage() {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;
  const {
    state: { userName },
  } = useContext(AuthContext);

  const { data: meetingFrame } = useGetMeetingQuery(uuid);
  const { isTimePickerUpdate } = useContext(TimePickerUpdateStateContext);
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

  const renderPicker = (meetingType: MeetingType) => {
    if (!meetingFrame) return;

    switch (meetingType) {
      case 'DATETIME':
        return isTimePickerUpdate ? (
          <SchedulePickerContainer
            firstTime={meetingFrame.firstTime}
            lastTime={meetingFrame.lastTime}
            availableDates={meetingFrame.availableDates}
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
          <MeetingConfirmCalendar.Picker availableDates={meetingFrame.availableDates} />
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
      {meetingFrame && renderPicker(meetingFrame.type)}
    </div>
  );
}
