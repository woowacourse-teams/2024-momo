import Text from '@components/_common/Text';

import firstCarouselImage from '@assets/images/carousel-first.png';

import { s_carouselImage, s_textContainer } from './LandingCarousels.styles';

export default function FirstCarousel() {
  return (
    <>
      <img src={firstCarouselImage} alt="랜딩 첫 번째 이미지" css={s_carouselImage} />
      <div css={s_textContainer}>
        <Text typo="titleBold">약속 시간을 결정하기 힘드신가요?</Text>
        <div>
          <Text typo="captionMedium" textAlign="center">
            약속 시간을 결정하느라 친구들의 답장을 하염없이 기다리거나,
          </Text>
          <Text typo="captionMedium" textAlign="center">
            중요한 일들을 미루고 만날 시간만 고민한 적 있나요?
          </Text>
        </div>
      </div>
    </>
  );
}
