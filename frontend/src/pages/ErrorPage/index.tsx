import { useNavigate } from 'react-router-dom';

import { Button } from '@components/_common/Buttons/Button';
import Text from '@components/_common/Text';

import type { ResponseError } from '@utils/responseError';

import QuestionMomoCharacter from '@assets/images/questionMomoCharacter.svg';

import { MEETING_CREATE_PATH } from '@constants/routes/meeting';

import { s_container, s_textContainer } from './ErrorPage.styles';

interface ErrorPageProps {
  error?: unknown;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  const navigate = useNavigate();
  const responseError = error as ResponseError;

  return (
    <div css={s_container}>
      <QuestionMomoCharacter width="128" height="180" />
      <div css={s_textContainer}>
        <Text typo="titleBold">
          <Text.Accent>{responseError?.name}</Text.Accent>
        </Text>
        <Text typo="bodyBold">{responseError?.message}</Text>
        <Text typo="bodyBold">
          <Text.Accent>{responseError?.status}</Text.Accent>
        </Text>
      </div>

      <Button onClick={() => navigate(MEETING_CREATE_PATH)} variant="primary" size="full">
        처음으로 돌아가기
      </Button>
    </div>
  );
}
