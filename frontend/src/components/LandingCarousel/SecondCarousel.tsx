import Text from '@components/_common/Text';

import secondCarouselImage from '@assets/images/carousel-second.png';

import { s_carouselImage, s_textContainer } from './LandingCarousels.styles';

export default function SecondCarousel() {
  return (
    <>
      <img src={secondCarouselImage} alt="랜딩 두 번째 이미지" css={s_carouselImage} />
      <div css={s_textContainer}>
        <Text typo="titleBold" textAlign="center">
          <Text.Accent text="모모" />가 도와드릴게요
        </Text>
        <div>
          <Text typo="captionMedium">
            이제는 손쉽게 약속 시간을 결정하고, 기다리는 시간을 줄여보세요!
          </Text>
        </div>
      </div>
    </>
  );
}
