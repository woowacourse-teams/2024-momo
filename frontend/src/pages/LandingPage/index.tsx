import ContentLayout from '@layouts/ContentLayout';

import ComponentCarousel from '@components/ComponentCarousel';
import FirstCarousel from '@components/LandingCarousel/FirstCarousel';
import FourthCarousel from '@components/LandingCarousel/FourthCarousel';
import SecondCarousel from '@components/LandingCarousel/SecondCarousel';
import ThirdCarousel from '@components/LandingCarousel/ThirdCarousel';
import BottomFixedButton from '@components/_common/Buttons/BottomFixedButton';

import useRouter from '@hooks/useRouter/useRouter';

import { MEETING_CREATE_PATH } from '@constants/routes/meeting';

import { s_container } from './LandingPage.styles';

const slides = [
  <FirstCarousel key="first" />,
  <SecondCarousel key="second" />,
  <ThirdCarousel key="third" />,
  <FourthCarousel key="fourth" />,
];

export default function LandingPage() {
  const { routeTo } = useRouter();

  return (
    <ContentLayout>
      <div css={s_container}>
        <ComponentCarousel slides={slides} />
        <BottomFixedButton onClick={() => routeTo(MEETING_CREATE_PATH)}>
          약속 생성하기
        </BottomFixedButton>
      </div>
    </ContentLayout>
  );
}
