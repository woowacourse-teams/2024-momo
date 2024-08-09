import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getMeetingAttendees } from '@apis/mettingRecommend';

import { QUERY_KEY } from '@constants/queryKeys';

import {
  s_container,
  s_pageHeader,
  s_title,
} from '../MeetingRecommendPage/MeetingRecommendPage.styles';
import MeetingTimeOptions from './components/MeetingTimeOptions';

export default function MeetingConfirmPage() {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const { data: attendeeNames } = useQuery({
    queryKey: [QUERY_KEY.meetingMySchedule],
    queryFn: () => getMeetingAttendees({ uuid }),
    retry: 0,
  });

  return (
    <div css={s_container} aria-label="약속 시간 확정 페이지">
      <section css={s_pageHeader}>
        <h1 css={s_title}>약속 시간을 확정해 보세요</h1>
      </section>
      {attendeeNames && <MeetingTimeOptions uuid={uuid} attendeeNames={attendeeNames} />}
    </div>
  );
}
