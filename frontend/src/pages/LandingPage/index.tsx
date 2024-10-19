import ContentLayout from '@layouts/ContentLayout/ContentLayout';

import { Button } from '@components/_common/Buttons/Button';
import Text from '@components/_common/Text';

import useRouter from '@hooks/useRouter/useRouter';

import MomoCharacter from '@assets/images/momoCharacter.svg';

import { MEETING_CREATE_PATH } from '@constants/routes/meeting';

import { s_container } from './LandingPage.styles';

export default function LandingPage() {
  const { routeTo } = useRouter();

  return (
    <ContentLayout>
      <div css={s_container}>
        <h1>
          <Text typo="titleBold">
            모두 쉽게 모이자! <Text.Accent text="모모" /> 🍑
          </Text>
        </h1>
        <MomoCharacter width="128" height="180" />
        <Button onClick={() => routeTo(MEETING_CREATE_PATH)} variant="primary" size="full">
          약속 생성하기
        </Button>
      </div>
    </ContentLayout>
  );
}
