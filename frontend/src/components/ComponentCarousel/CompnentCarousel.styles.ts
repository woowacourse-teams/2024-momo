import { css } from '@emotion/react';

import theme from '@styles/theme';

export const carouselContainerStyles = css`
  position: relative;

  overflow: hidden;

  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export const getSlideContainerStyles = (currentIndex: number, isTransitioning: boolean) => css`
  transform: translateX(${-currentIndex * 100}%);
  display: flex;
  transition: ${isTransitioning ? 'transform 0.5s ease-in-out' : 'none'};
`;

export const carouselSlideStyles = css`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;

  width: 100%;
`;

export const indicatorContainerStyles = css`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
`;

export const getIndicatorStyles = (active: boolean) => css`
  cursor: pointer;

  width: 8px;
  height: 8px;

  background-color: ${active ? theme.colors.primary : theme.colors.grey.primary};
  border-radius: 50%;

  transition: background-color 0.3s ease;
`;
