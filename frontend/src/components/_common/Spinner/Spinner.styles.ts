import { css, keyframes } from '@emotion/react';
import type { CSSProperties } from 'react';

const pulse = keyframes`
  0%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }

  50% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const s_spinnerContainer = css`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 2rem;
  height: 2rem;
`;

export const s_spinner = (backgroundColor: CSSProperties['color']) => css`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 100%;

  &::before {
    content: '';

    transform: scale(0);

    width: 20%;
    height: 20%;

    opacity: 0.5;
    background-color: ${backgroundColor};
    border-radius: 50%;
    box-shadow: 0 0 20px rgb(18 31 53 / 30%);

    animation: ${pulse} calc(0.9s * 1.111) ease-in-out infinite;
  }

  &:nth-of-type(2) {
    transform: rotate(45deg);
  }

  &:nth-of-type(2)::before {
    animation-delay: calc(0.9s * -0.875);
  }

  &:nth-of-type(3) {
    transform: rotate(90deg);
  }

  &:nth-of-type(3)::before {
    animation-delay: calc(0.9s * -0.75);
  }

  &:nth-of-type(4) {
    transform: rotate(135deg);
  }

  &:nth-of-type(4)::before {
    animation-delay: calc(0.9s * -0.625);
  }

  &:nth-of-type(5) {
    transform: rotate(180deg);
  }

  &:nth-of-type(5)::before {
    animation-delay: calc(0.9s * -0.5);
  }

  &:nth-of-type(6) {
    transform: rotate(225deg);
  }

  &:nth-of-type(6)::before {
    animation-delay: calc(0.9s * -0.375);
  }

  &:nth-of-type(7) {
    transform: rotate(270deg);
  }

  &:nth-of-type(7)::before {
    animation-delay: calc(0.9s * -0.25);
  }

  &:nth-of-type(8) {
    transform: rotate(315deg);
  }

  &:nth-of-type(8)::before {
    animation-delay: calc(0.9s * -0.125);
  }
`;
