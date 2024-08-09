import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getMeetingAttendees } from '@apis/meetingRecommend';

import { QUERY_KEY } from '@constants/queryKeys';

import { s_container, s_pageHeader, s_title } from './MeetingRecommendPage.styles';
import MeetingTimeRecommends from './components/MeetingTimeRecommends';

export default function MeetingRecommendPage() {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const { data: attendeeNames } = useQuery({
    queryKey: [QUERY_KEY.meetingAttendees],
    queryFn: () => getMeetingAttendees({ uuid }),
    retry: 0,
  });

  return (
    <div css={s_container} aria-label="약속 시간 추천 페이지">
      <section css={s_pageHeader}>
        <h1 css={s_title}>약속 시간을 추천해 드려요</h1>
      </section>
      {attendeeNames && <MeetingTimeRecommends uuid={uuid} attendeeNames={attendeeNames} />}
    </div>
  );
}
