import Text from '@components/_common/Text';

import fourthCarouselImage from '@assets/images/carousel-fourth.png';

import { s_carouselImage, s_textContainer } from './LandingCarousels.styles';

export default function FourthCarousel() {
  return (
    <>
      <img src={fourthCarouselImage} alt="랜딩 네 번째 이미지" css={s_carouselImage} />
      <div css={s_textContainer}>
        <Text typo="titleBold">
          <Text.Accent text="쉽게 " />
          만들고, 공유하고, 모이고!
        </Text>
        <div>
          <Text typo="captionMedium" textAlign="center">
            약속 시간 조율 스트레스는 이제 없어요!
          </Text>
          <Text typo="captionMedium" textAlign="center">
            빠르게 모이고 친구들과 시간을 보내봐요
          </Text>
        </div>
      </div>
    </>
  );
}
