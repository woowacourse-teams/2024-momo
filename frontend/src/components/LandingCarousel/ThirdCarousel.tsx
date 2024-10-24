import Text from '@components/_common/Text';

import thirdCarouselImage from '@assets/images/carousel-third.png';

import { s_carouselImage, s_textContainer } from './LandingCarousels.styles';

export default function ThirdCarousel() {
  return (
    <>
      <img src={thirdCarouselImage} alt="랜딩 첫 번째 이미지" css={s_carouselImage} />
      <div css={s_textContainer}>
        <Text typo="titleBold">
          약속 일정을 <Text.Accent text="간편하게" /> 등록해요
        </Text>
        <div>
          <Text typo="captionMedium" textAlign="center">
            {
              '시간을 등록할 때는 드래그로 원하는 시간대를 쉽게 선택해요.\n 날짜를 등록할 때는 달력을 클릭해 간편하게 선택할 수 있어요'
            }
          </Text>
        </div>
      </div>
    </>
  );
}
