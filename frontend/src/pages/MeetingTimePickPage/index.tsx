import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '@contexts/AuthProvider';
import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import SchedulePickerContainer from '@components/Schedules/SchedulePicker/SchedulePickerContainer';
import SchedulesViewer from '@components/Schedules/ScheduleViewer/SchedulesViewer';
import { Button } from '@components/_common/Buttons/Button';
import ToggleButton from '@components/_common/Buttons/ToggleButton';

import { useLockMeetingMutation, useUnlockMeetingMutation } from '@stores/servers/meeting/mutation';
import { useGetMeetingQuery } from '@stores/servers/meeting/queries';

import {
  s_container,
  s_pageHeader,
  s_tipInfo,
  s_title,
  s_toggleButtonContainer,
} from './MeetingTimePickPage.styles';

const MEETING_QUERY_PAGE_ATTRIBUTES = {
  title: '약속에 참여할 수 있는 시간을\n알려주세요',
  dragInfo: '약속에 참여할 수 있는 시간을 드래그로 표시해 보세요 :)',
  timeClickInfo: '시간을 클릭하면 해당 시간을 선택한 참여원들을 확인할 수 있어요 :)',
};

export default function MeetingTimePickPage() {
  const navigate = useNavigate();
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

  return (
    <div css={s_container} aria-label="약속 정보 조회 페이지">
      <section css={s_pageHeader}>
        <h1 css={s_title}>{MEETING_QUERY_PAGE_ATTRIBUTES.title}</h1>
        <span css={s_tipInfo}>{MEETING_QUERY_PAGE_ATTRIBUTES.dragInfo}</span>
        <span css={s_tipInfo}>{MEETING_QUERY_PAGE_ATTRIBUTES.timeClickInfo}</span>
        {meetingFrame?.hostName === userName && (
          <div css={s_toggleButtonContainer}>
            <Button size="s" variant="primary" onClick={() => navigate('confirm')}>
              확정하러 가기
            </Button>
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
      {meetingFrame && !isTimePickerUpdate ? (
        <SchedulesViewer
          isLocked={meetingFrame?.isLocked}
          firstTime={meetingFrame.firstTime}
          lastTime={meetingFrame.lastTime}
          availableDates={meetingFrame.availableDates}
          meetingAttendees={meetingFrame.attendeeNames}
        />
      ) : (
        meetingFrame && (
          <SchedulePickerContainer
            firstTime={meetingFrame.firstTime}
            lastTime={meetingFrame.lastTime}
            availableDates={meetingFrame.availableDates}
          />
        )
      )}
      {!isTimePickerUpdate && (
        <Button size="full" variant="primary" onClick={() => navigate('recommend')}>
          추천 받으러 가기
        </Button>
      )}
    </div>
  );
}
