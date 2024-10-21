import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

import ContentLayout from '@layouts/ContentLayout';

import { UuidContext } from '@contexts/UuidProvider';

import BackButton from '@components/_common/Buttons/BackButton';
import Header from '@components/_common/Header';
import Text from '@components/_common/Text';

import { getMeetingAttendees } from '@apis/meetings/recommends';

import { QUERY_KEY } from '@constants/queryKeys';

import { s_container, s_pageHeader } from './MeetingRecommendPage.styles';
import MeetingTimeRecommends from './components/MeetingTimeRecommends';

export default function MeetingRecommendPage() {
  const { uuid } = useContext(UuidContext);

  const { data: attendeeNames } = useQuery({
    queryKey: [QUERY_KEY.meetingAttendees],
    queryFn: () => getMeetingAttendees({ uuid }),
    retry: 0,
  });

  return (
    <>
      <Header title="약속 추천받기">
        <BackButton path={`/meeting/${uuid}/viewer`} />
      </Header>
      <ContentLayout>
        <div css={s_container} aria-label="약속 시간 추천 페이지">
          <section css={s_pageHeader}>
            <Text typo="titleBold">가장 만나기 좋은 약속시간</Text>
          </section>
          {attendeeNames && <MeetingTimeRecommends uuid={uuid} attendeeNames={attendeeNames} />}
        </div>
      </ContentLayout>
    </>
  );
}
