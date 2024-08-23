import { useNavigate } from 'react-router-dom';

import { Button } from '@components/_common/Buttons/Button';
import Text from '@components/_common/Text';

import MomoCharacter from '@assets/images/momoCharacter.svg';

import { MEETING_CREATE_PATH } from '@constants/routes/meeting';

import { s_container } from './LandingPage.styles';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div css={s_container}>
      <Text typo="titleBold">
        모두 쉽게 모이자! <Text.Accent text="모모" /> 🍑
      </Text>
      <MomoCharacter width="128" height="180" />
      <Button onClick={() => navigate(MEETING_CREATE_PATH)} variant="primary" size="full">
        약속 생성하기
      </Button>
    </div>
  );
}
