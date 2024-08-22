import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import Text from '@components/_common/Text';

import { getMeetingAttendees } from '@apis/meetingRecommend';

import { QUERY_KEY } from '@constants/queryKeys';

import { s_container, s_pageHeader } from './MeetingRecommendPage.styles';
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
        <Text typo="titleBold">가장 만나기 좋은 약속시간</Text>
      </section>
      {attendeeNames && <MeetingTimeRecommends uuid={uuid} attendeeNames={attendeeNames} />}
    </div>
  );
}
