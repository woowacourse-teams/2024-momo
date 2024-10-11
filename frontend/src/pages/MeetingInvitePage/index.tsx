import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '@contexts/AuthProvider';

import { Button } from '@components/_common/Buttons/Button';

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
} from './MeetingInvitePage.styles';

export default function MeetingInvitePage() {
  const navigate = useNavigate();

  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const { isLoggedIn } = useContext(AuthContext).state;

  const handleMeetingRegisterButtonClick = () => {
    if (isLoggedIn) {
      navigate(`/meeting/${uuid}/register`);
    } else {
      navigate(`/meeting/${uuid}/login`);
    }
  };

  const handleMeetingViewButtonClick = () => {
    navigate(`/meeting/${uuid}/viewer`);
  };

  return (
    <div css={s_container}>
      <div css={s_infoContainer}>
        <Logo width="128" height="128" />
        <div css={s_textContainer}>
          <h1 css={s_titleText}>약속명</h1>
          <div
            css={s_explanationText}
          >{`일정 조율을 위해 약속에 참여할 수 있는\n날짜와 시간을 알려주세요.`}</div>
        </div>
      </div>
      <div css={s_buttonContainer}>
        <Button size="full" customCss={s_pinkButton} onClick={handleMeetingRegisterButtonClick}>
          바로 등록할게요
        </Button>
        <Button size="full" customCss={s_lightPinkButton} onClick={handleMeetingViewButtonClick}>
          조회부터 할게요
        </Button>
      </div>
    </div>
  );
}
