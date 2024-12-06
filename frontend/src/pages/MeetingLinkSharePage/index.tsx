import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import type { PostMeetingResult } from 'types/meeting';

import ContentLayout from '@layouts/ContentLayout';

import { UuidContext } from '@contexts/UuidProvider';

import { Button } from '@components/_common/Buttons/Button';
import CopyLink from '@components/_common/CopyLink';
import Header from '@components/_common/Header';

import useKakaoTalkShare from '@hooks/useKakaoTalkShare/useKakaoTalkShare';
import useRouter from '@hooks/useRouter/useRouter';

import KakaoIcon from '@assets/images/kakao.svg';
import logoSunglass from '@assets/images/logoSunglass.webp';

import { MEETING_INVITE_TEMPLATE_ID } from '@constants/kakao';

import {
  s_button,
  s_buttonContainer,
  s_container,
  s_meetingInfo,
} from './MeetingLinkSharePage.styles';

interface RouteState {
  state: {
    meetingInfo: PostMeetingResult;
  };
}

export default function MeetingLinkSharePage() {
  const { routeTo } = useRouter();
  const { uuid } = useContext(UuidContext);

  const {
    state: { meetingInfo },
  } = useLocation() as RouteState;

  const LINK = `${window.location.origin}/meeting/${uuid}`;

  const { handleKakaoTalkShare } = useKakaoTalkShare();

  const handleKakaoButtonClick = () => {
    handleKakaoTalkShare(MEETING_INVITE_TEMPLATE_ID, {
      path: uuid ?? '/',
      hostName: meetingInfo.userName,
      meetingName: meetingInfo.meetingName,
    });
  };

  return (
    <>
      <Header title="약속 공유하기" />
      <ContentLayout>
        <div css={s_container}>
          <img src={logoSunglass} width={160} height={160} alt="" />
          <div css={s_meetingInfo}>
            <CopyLink url={LINK} />
            <div css={s_buttonContainer}>
              <Button size="full" variant="kakao" css={s_button} onClick={handleKakaoButtonClick}>
                <KakaoIcon width="24" height="24" />
                카카오톡으로 공유하기
              </Button>

              <Button
                size="full"
                variant="primary"
                css={s_button}
                onClick={() => routeTo(`/meeting/${uuid}`)}
              >
                시간 등록하러 가기
              </Button>
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
}
