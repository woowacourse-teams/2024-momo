import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import SchedulesViewer from '@components/Schedules/SchedulesViewer';
import TimePickerContainer from '@components/Time/Picker/TimePickerContainer';

import { useGetMeetingQuery } from '@stores/servers/meeting/queries';

import { s_container, s_pageHeader, s_tipInfo, s_title } from './MeetingTimePickPage.styles';

const MEETING_QUERY_PAGE_ATTRIBUTES = {
  title: '약속에 참여할 수 있는 시간을\n알려주세요',
  dragInfo: '약속에 참여할 수 있는 시간을 드래그로 표시해 보세요 :)',
  timeClickInfo: '시간을 클릭하면 해당 시간을 선택한 참여원들을 확인할 수 있어요 :)',
};

export default function MeetingTimePickPage() {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const { data: meetingFrame } = useGetMeetingQuery(uuid);
  const { isTimePickerUpdate } = useContext(TimePickerUpdateStateContext);

  return (
    <div css={s_container} aria-label="약속 정보 조회 페이지">
      <section css={s_pageHeader}>
        <h1 css={s_title}>{MEETING_QUERY_PAGE_ATTRIBUTES.title}</h1>
        <span css={s_tipInfo}>{MEETING_QUERY_PAGE_ATTRIBUTES.dragInfo}</span>
        <span css={s_tipInfo}>{MEETING_QUERY_PAGE_ATTRIBUTES.timeClickInfo}</span>
      </section>
      {meetingFrame && !isTimePickerUpdate ? (
        <SchedulesViewer
          firstTime={meetingFrame?.firstTime}
          lastTime={meetingFrame?.lastTime}
          availableDates={meetingFrame?.availableDates}
          meetingAttendees={meetingFrame?.attendees}
        />
      ) : (
        meetingFrame && (
          <TimePickerContainer
            firstTime={meetingFrame?.firstTime}
            lastTime={meetingFrame?.lastTime}
            availableDates={meetingFrame?.availableDates}
          />
        )
      )}
    </div>
  );
}
