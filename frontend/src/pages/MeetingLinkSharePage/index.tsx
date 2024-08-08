import { useParams } from 'react-router-dom';

import { copyToClipboard } from '@utils/clipboard';

import LogoSunglass from '@assets/images/logoSunglass.svg';

import {
  s_button,
  s_buttonContainer,
  s_container,
  s_description,
  s_meetingInfo,
} from './MeetingLinkSharePage.styles';

export default function MeetingLinkSharePage() {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const LINK = `${window.location.host}/meeting/${uuid}`;

  return (
    <div css={s_container}>
      <LogoSunglass width="220" height="220" />
      <div css={s_meetingInfo}>
        {/* TODO: '${약속 명} 약속을 만들었어요 :)'로 변경 논의 후 적용 (@Yoonkyoungme) */}
        <div css={s_description}>약속을 만들었어요 :)</div>
        <div css={s_buttonContainer}>
          <button css={s_button} onClick={() => copyToClipboard(LINK)}>
            링크 복사
          </button>
          <button css={s_button}>시간 등록하러 가기</button>
          <button css={s_button}>카카오톡으로 공유하기</button>
        </div>
      </div>
    </div>
  );
}
