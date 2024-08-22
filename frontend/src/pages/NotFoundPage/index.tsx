import { useNavigate } from 'react-router-dom';

import { Button } from '@components/_common/Buttons/Button';
import Text from '@components/_common/Text';

import QuestionMomoCharacter from '@assets/images/questionMomoCharacter.svg';

import { MEETING_CREATE_PATH } from '@constants/routes/meeting';

import { s_container, s_textContainer } from './NotFound.styles';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div css={s_container}>
      <QuestionMomoCharacter width="128" height="180" />
      <div css={s_textContainer}>
        <Text typo="titleBold">
          <Text.Accent>404</Text.Accent>
        </Text>
        <Text typo="bodyBold">원하시는 페이지를 찾을 수 없어요 :(</Text>
      </div>

      <Button onClick={() => navigate(MEETING_CREATE_PATH)} variant="primary" size="full">
        약속 생성하러가기
      </Button>
    </div>
  );
}
