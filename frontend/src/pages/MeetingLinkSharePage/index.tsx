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
  // TODO: LINK를 실제 prop / useLocation에서 보내주는 값으로 교체하기 (@Yoonkyoungme)
  const LINK = '🔮🍀🐫 생성된 링크 🔮🍀🐫';

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
