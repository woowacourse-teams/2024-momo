import ContentLayout from '@layouts/ContentLayout';

import { Button } from '@components/_common/Buttons/Button';
import Text from '@components/_common/Text';

import useRouter from '@hooks/useRouter/useRouter';

import QuestionMomoCharacter from '@assets/images/questionMomoCharacter.svg';

import { MEETING_CREATE_PATH } from '@constants/routes/meeting';

import { s_container, s_textContainer } from './NotFoundPage.styles';

export default function NotFoundPage() {
  const { routeTo } = useRouter();

  return (
    <ContentLayout>
      <div css={s_container}>
        <QuestionMomoCharacter width="128" height="180" />
        <div css={s_textContainer}>
          <Text typo="titleBold">
            <Text.Accent text="404" />
          </Text>
          <Text typo="bodyBold">요청하신 페이지를 찾을 수 없어요 :(</Text>
        </div>

        <Button onClick={() => routeTo(MEETING_CREATE_PATH)} variant="primary" size="full">
          약속 생성하러가기
        </Button>
      </div>
    </ContentLayout>
  );
}
