import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@components/_common/Buttons/Button';

import { copyToClipboard } from '@utils/clipboard';

import KakaoIcon from '@assets/images/kakao.svg';
import LogoSunglass from '@assets/images/logoSunglass.svg';

import {
  s_button,
  s_buttonContainer,
  s_container,
  s_description,
  s_meetingInfo,
} from './MeetingLinkSharePage.styles';

declare global {
  export interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

export default function MeetingLinkSharePage() {
  const { Kakao } = window;
  const navigate = useNavigate();
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const LINK = `${window.location.host}/meeting/${uuid}`;

  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.KAKAO_KEY);
    }
  }, [Kakao]);

  const handleShareButton = () => {
    Kakao.Share.sendCustom({
      templateId: Number(process.env.KAKAO_MESSAGE_TEMPLATE_ID),
      templateArgs: {
        uuid: uuid,
      },
    });
  };

  return (
    <div css={s_container}>
      <LogoSunglass width="220" height="220" />
      <div css={s_meetingInfo}>
        {/* TODO: '${약속 명} 약속을 만들었어요 :)'로 변경 논의 후 적용 (@Yoonkyoungme) */}
        <div css={s_description}>약속을 만들었어요 :)</div>
        <div css={s_buttonContainer}>
          <Button size="full" variant="secondary" onClick={() => copyToClipboard(LINK)}>
            링크 복사
          </Button>
          <Button
            size="full"
            variant="primary"
            css={s_button}
            onClick={() => navigate(`/meeting/${uuid}`)}
          >
            시간 등록하러 가기
          </Button>
          <Button size="full" variant="kakao" css={s_button} onClick={handleShareButton}>
            <KakaoIcon width="24" height="24" />
            카카오톡으로 공유하기
          </Button>
        </div>
      </div>
    </div>
  );
}
