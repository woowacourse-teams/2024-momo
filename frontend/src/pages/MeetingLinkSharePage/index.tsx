import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@components/_common/Buttons/Button';

import { copyToClipboard } from '@utils/clipboard';

import CheckIcon from '@assets/images/check.svg';
import CopyIcon from '@assets/images/copy.svg';
import KakaoIcon from '@assets/images/kakao.svg';
import LogoSunglass from '@assets/images/logoSunglass.svg';

import {
  s_button,
  s_buttonContainer,
  s_check,
  s_container,
  s_copyButton,
  s_copyButtonContainer,
  s_copyContainer,
  s_description,
  s_meetingInfo,
  s_urlText,
} from './MeetingLinkSharePage.styles';

declare global {
  export interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

export default function MeetingLinkSharePage() {
  const [copyComplete, setCopyComplete] = useState(false);
  const { Kakao } = window;
  const navigate = useNavigate();
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;
  const LINK = `${window.location.protocol}//${window.location.host}/meeting/${uuid}`;

  // TODO: 약속명이 있다면, ${userName}을 templateArgs에 같이 삽입(@낙타)
  const handleShareButton = () => {
    Kakao.Share.sendCustom({
      templateId: Number(process.env.KAKAO_MESSAGE_TEMPLATE_ID),
      templateArgs: {
        uuid: uuid,
      },
    });
  };

  const handleCopyClick = () => {
    copyToClipboard(LINK);
    setCopyComplete(true);
    setTimeout(() => setCopyComplete(false), 2500);
  };

  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.KAKAO_KEY);
    }
  }, [Kakao]);

  return (
    <div css={s_container}>
      <LogoSunglass width="160" height="160" />
      <div css={s_meetingInfo}>
        {/* TODO: '${약속 명} 약속을 만들었어요 :)'로 변경 논의 후 적용 (@Yoonkyoungme) */}
        <div css={s_description}>약속을 만들었어요 :)</div>
        <div css={s_buttonContainer}>
          <div css={s_copyContainer}>
            <span css={s_urlText}>{LINK}</span>
            <div css={s_copyButtonContainer}>
              {copyComplete ? (
                <CheckIcon css={s_check} width="24" height="24" />
              ) : (
                <button css={s_copyButton} onClick={handleCopyClick}>
                  <CopyIcon width="24" height="24" />
                </button>
              )}
            </div>
          </div>
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
