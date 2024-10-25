import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';

import {
  carouselContainerStyles,
  carouselSlideStyles,
  getIndicatorStyles,
  getSlideContainerStyles,
  indicatorContainerStyles,
} from './CompnentCarousel.styles';

interface CarouselProps {
  slides: ReactNode[];
  interval?: number;
}

export default function ComponentCarousel({ slides, interval = 3000 }: CarouselProps) {
  const extendedSlides = [...slides.slice(-2), ...slides, ...slides.slice(0, 2)];

  const [currentIndex, setCurrentIndex] = useState(2);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const getRealIndex = () => {
    if (currentIndex <= 1) return slides.length + currentIndex - 2;
    if (currentIndex >= slides.length + 2) return currentIndex - slides.length - 2;
    return currentIndex - 2;
  };

  const resetPosition = useCallback(() => {
    if (currentIndex <= 1) {
      setIsTransitioning(false);
      setCurrentIndex(slides.length + currentIndex);
    } else if (currentIndex >= slides.length + 2) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - slides.length);
    }
  }, [currentIndex, slides.length]);

  useEffect(() => {
    const slider = document.querySelector('.carousel-slider');
    const handleTransitionEnd = () => {
      resetPosition();
    };

    slider?.addEventListener('transitionend', handleTransitionEnd);
    return () => {
      slider?.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [resetPosition]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div css={carouselContainerStyles}>
      <div className="carousel-slider" css={getSlideContainerStyles(currentIndex, isTransitioning)}>
        {extendedSlides.map((slide, index) => (
          <div key={index} css={carouselSlideStyles}>
            {slide}
          </div>
        ))}
      </div>
      <div css={indicatorContainerStyles}>
        {slides.map((_, index) => (
          <div key={index} css={getIndicatorStyles(index === getRealIndex())} />
        ))}
      </div>
    </div>
  );
}
