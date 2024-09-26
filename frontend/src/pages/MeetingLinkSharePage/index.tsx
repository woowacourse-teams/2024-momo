import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { PostMeetingResult } from 'types/meeting';

import { Button } from '@components/_common/Buttons/Button';
import CopyLink from '@components/_common/CopyLink';

import useKakaoTalkShare from '@hooks/useKakaoTalkShare/useKakaoTalkShare';

import KakaoIcon from '@assets/images/kakao.svg';
import LogoSunglass from '@assets/images/logoSunglass.svg';

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
  const {
    state: { meetingInfo },
  } = useLocation() as RouteState;
  const navigate = useNavigate();
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;
  const LINK = `${window.location.protocol}//${window.location.host}/meeting/${uuid}`;

  const { handleKakaoTalkShare } = useKakaoTalkShare();

  const handleKakaoButtonClick = () => {
    handleKakaoTalkShare(MEETING_INVITE_TEMPLATE_ID, {
      path: uuid,
      hostName: meetingInfo.userName,
      meetingName: meetingInfo.meetingName,
    });
  };

  return (
    <div css={s_container}>
      <LogoSunglass width="160" height="160" />
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
            onClick={() => navigate(`/meeting/${uuid}`)}
          >
            시간 등록하러 가기
          </Button>
        </div>
      </div>
    </div>
  );
}
