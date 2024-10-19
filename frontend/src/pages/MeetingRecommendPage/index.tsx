import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

import ContentLayout from '@layouts/ContentLayout';

import { UuidContext } from '@contexts/UuidProvider';

import Header from '@components/_common/Header';
import { s_backButton } from '@components/_common/Header/Header.styles';
import Text from '@components/_common/Text';

import useRouter from '@hooks/useRouter/useRouter';

import { getMeetingAttendees } from '@apis/meetings/recommends';

import BackSVG from '@assets/images/back.svg';

import { QUERY_KEY } from '@constants/queryKeys';

import { s_container, s_pageHeader } from './MeetingRecommendPage.styles';
import MeetingTimeRecommends from './components/MeetingTimeRecommends';

export default function MeetingRecommendPage() {
  const { routeTo } = useRouter();
  const { uuid } = useContext(UuidContext);

  const { data: attendeeNames } = useQuery({
    queryKey: [QUERY_KEY.meetingAttendees],
    queryFn: () => getMeetingAttendees({ uuid }),
    retry: 0,
  });

  return (
    <>
      <Header title="약속 추천받기">
        <button css={s_backButton} onClick={() => routeTo(`/meeting/${uuid}/viewer`)}>
          <BackSVG width="24" height="24" />
        </button>
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
