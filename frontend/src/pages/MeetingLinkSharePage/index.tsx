import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { PostMeetingResult } from 'types/meeting';

import { Button } from '@components/_common/Buttons/Button';

import useKakaoTalkShare from '@hooks/useKakaoTalkShare/useKakaoTalkShare';

import { copyToClipboard } from '@utils/clipboard';
import groupDates from '@utils/groupDates';

import CheckIcon from '@assets/images/check.svg';
import CopyIcon from '@assets/images/copy.svg';
import KakaoIcon from '@assets/images/kakao.svg';
import LogoSunglass from '@assets/images/logoSunglass.svg';

import { MEETING_INVITE_TEMPLATE_ID } from '@constants/kakao';

import {
  s_availableDatesContainer,
  s_button,
  s_buttonContainer,
  s_check,
  s_container,
  s_copyButton,
  s_copyButtonContainer,
  s_copyContainer,
  s_description,
  s_descriptionContainer,
  s_meetingInfo,
  s_urlText,
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
  const [copyComplete, setCopyComplete] = useState(false);
  const navigate = useNavigate();
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;
  const LINK = `${window.location.protocol}//${window.location.host}/meeting/${uuid}`;

  const { onShareKakaoTalk: handleShareKakaoTalk } = useKakaoTalkShare();

  const handleCopyClick = async () => {
    setCopyComplete(true);
    setTimeout(() => setCopyComplete(false), 2500);
  };

  const handleKakaoButtonClick = () => {
    handleShareKakaoTalk(MEETING_INVITE_TEMPLATE_ID, {
      path: uuid,
      hostName: meetingInfo.userName,
      meetingName: meetingInfo.meetingName,
    });
  };

  return (
    <div css={s_container}>
      <LogoSunglass width="160" height="160" />
      <div css={s_meetingInfo}>
        <div css={s_descriptionContainer}>
          <div css={s_description}>
            <h2>약속명</h2>
            <p>{meetingInfo.meetingName}</p>
          </div>
          <div css={s_description}>
            <h2>주최자</h2>
            <p>{meetingInfo.userName}</p>
          </div>
          <div css={s_description}>
            <h2>시작시간</h2>
            <p>{meetingInfo.firstTime}</p>
          </div>
          <div css={s_description}>
            <h2>끝시간</h2>
            <p>{meetingInfo.lastTime === '00:00' ? '24:00' : meetingInfo.lastTime}</p>
          </div>
          <div css={s_description}>
            <h2>가능시간</h2>
            <p>
              {Object.entries(groupDates(meetingInfo.availableDates)).map(([month, dates]) => (
                <div css={s_availableDatesContainer} key={month}>
                  <h3>{month}월</h3>
                  <span>{dates.join(', ')}</span>
                </div>
              ))}
            </p>
          </div>
        </div>
        <div css={s_buttonContainer}>
          <div css={s_copyContainer}>
            <span css={s_urlText}>{LINK}</span>
            <div css={s_copyButtonContainer}>
              {copyComplete ? (
                <CheckIcon css={s_check} width="24" height="24" />
              ) : (
                <button css={s_copyButton} onClick={() => copyToClipboard(LINK, handleCopyClick)}>
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
          <Button size="full" variant="kakao" css={s_button} onClick={handleKakaoButtonClick}>
            <KakaoIcon width="24" height="24" />
            카카오톡으로 공유하기
          </Button>
        </div>
      </div>
    </div>
  );
}
