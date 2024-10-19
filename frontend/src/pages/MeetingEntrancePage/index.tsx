import { useContext } from 'react';

import ContentLayout from '@layouts/ContentLayout';

import { AuthContext } from '@contexts/AuthProvider';

import { Button } from '@components/_common/Buttons/Button';
import Header from '@components/_common/Header';

import useRouter from '@hooks/useRouter/useRouter';
import useUuid from '@hooks/useUuid/useUuid';

import { useMeetingEntranceDetailQuery } from '@stores/servers/meeting/queries';

import Logo from '@assets/images/logo.svg';

import {
  s_buttonContainer,
  s_container,
  s_explanationText,
  s_infoContainer,
  s_lightPinkButton,
  s_pinkButton,
  s_textContainer,
  s_titleText,
} from './MeetingEntrancePage.styles';

const MEETING_TYPE = {
  DAYSONLY: '날짜를',
  DATETIME: '날짜와 시간을',
};

export default function MeetingEntrancePage() {
  const { routeTo } = useRouter();
  const { uuid } = useUuid();

  const { isLoggedIn } = useContext(AuthContext).state;

  const { data: { meetingName, type } = {} } = useMeetingEntranceDetailQuery(uuid);

  const handleMeetingRegisterButtonClick = () => {
    if (isLoggedIn) {
      routeTo(`/meeting/${uuid}/register`);
    } else {
      routeTo(`/meeting/${uuid}/login`);
    }
  };

  const handleMeetingViewButtonClick = () => {
    routeTo(`/meeting/${uuid}/viewer`);
  };

  return (
    <>
      <Header title="약속 입장하기" />
      <ContentLayout>
        <div css={s_container}>
          <div css={s_infoContainer}>
            <Logo width="128" height="128" />
            <div css={s_textContainer}>
              <h1 css={s_titleText}>{meetingName}</h1>
              <div
                css={s_explanationText}
              >{`일정 조율을 위해 약속에 참여할 수 있는 \n${type ? MEETING_TYPE[type] : MEETING_TYPE.DATETIME} 알려주세요.`}</div>
            </div>
          </div>
          <div css={s_buttonContainer}>
            <Button size="full" customCss={s_pinkButton} onClick={handleMeetingRegisterButtonClick}>
              바로 등록할게요
            </Button>
            <Button
              size="full"
              customCss={s_lightPinkButton}
              onClick={handleMeetingViewButtonClick}
            >
              조회부터 할게요
            </Button>
          </div>
        </div>
      </ContentLayout>
    </>
  );
}
