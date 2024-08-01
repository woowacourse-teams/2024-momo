import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import TimePickerContainer from '@components/Time/Picker/TimePickerContainer';
import TimeViewer from '@components/Time/Viewer';

import { useGetMeetingQuery } from '@stores/servers/meeting/queries';

import {
  s_attendeesContainer,
  s_container,
  s_pageHeader,
  s_tabButton,
  s_tipInfo,
  s_title,
} from './MeetingTimePickPage.styles';

const MEETING_QUERY_PAGE_ATTRIBUTES = {
  title: '약속에 참여할 수 있는 시간을\n알려주세요',
  dragInfo: '약속에 참여할 수 있는 시간을 드래그로 표시해 보세요 :)',
  timeClickInfo: '시간을 클릭하면 해당 시간을 선택한 참여원들을 확인할 수 있어요 :)',
};

export default function MeetingTimePickPage() {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const { data: meetingBase } = useGetMeetingQuery(uuid);

  const { isTimePickerUpdate } = useContext(TimePickerUpdateStateContext);

  const [selectedAttendee, setSelectedAttendee] = useState('');
  const handleAttendeeChange = (attendee: string) => {
    if (selectedAttendee === attendee) return;
    setSelectedAttendee(attendee);
  };

  return (
    <div css={s_container} aria-label="약속 정보 조회 페이지">
      <section css={s_pageHeader}>
        <h1 css={s_title}>{MEETING_QUERY_PAGE_ATTRIBUTES.title}</h1>
        <span css={s_tipInfo}>{MEETING_QUERY_PAGE_ATTRIBUTES.dragInfo}</span>
        <span css={s_tipInfo}>{MEETING_QUERY_PAGE_ATTRIBUTES.timeClickInfo}</span>
      </section>
      <section css={s_attendeesContainer} aria-label="약속 참가자들 정보">
        <button css={s_tabButton(true)} onClick={() => handleAttendeeChange('')}>
          전체
        </button>
        {meetingBase?.attendeeNames.map((attendee) => (
          <button
            key={attendee}
            css={s_tabButton(true)}
            onClick={() => handleAttendeeChange(attendee)}
          >
            {attendee}
          </button>
        ))}
      </section>
      {meetingBase && isTimePickerUpdate ? (
        <TimePickerContainer
          firstTime={meetingBase.firstTime}
          lastTime={meetingBase.lastTime}
          availableDates={meetingBase.availableDates}
        />
      ) : (
        meetingBase && (
          <TimeViewer
            firstTime={meetingBase.firstTime}
            lastTime={meetingBase.lastTime}
            availableDates={meetingBase.availableDates}
            selectedAttendee={selectedAttendee}
          />
        )
      )}
    </div>
  );
}
