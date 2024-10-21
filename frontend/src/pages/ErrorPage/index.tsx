import ContentLayout from '@layouts/ContentLayout';

import { Button } from '@components/_common/Buttons/Button';
import Text from '@components/_common/Text';

import type { ResponseError } from '@utils/responseError';

import QuestionMomoCharacter from '@assets/images/questionMomoCharacter.svg';

import { s_container, s_textContainer } from './ErrorPage.styles';

interface ErrorPageProps {
  error?: unknown;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  const responseError = error as ResponseError;

  const goFirstPage = () => {
    window.location.href = window.location.origin;
  };

  return (
    <ContentLayout>
      <div css={s_container}>
        <QuestionMomoCharacter width="128" height="180" />
        <div css={s_textContainer}>
          <Text typo="titleBold">
            <Text.Accent text={responseError.name} />
          </Text>
          <Text typo="bodyBold">{responseError?.message}</Text>
          <Text typo="bodyBold">
            <Text.Accent text={responseError?.status} />
          </Text>
        </div>

        <Button onClick={() => goFirstPage()} variant="primary" size="full">
          처음으로 돌아가기
        </Button>
      </div>
    </ContentLayout>
  );
}
