import { css, keyframes } from '@emotion/react';

import theme from '@styles/theme';

export const s_container = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  margin-bottom: 6rem;
`;

export const s_meetingInfo = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 90%;
  padding: 1.6rem;

  background-color: #f7dacb;
  border-radius: 0.5rem;
`;

export const s_buttonContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const s_button = css`
  height: 2.8rem;
`;

export const s_copyContainer = css`
  display: flex;
  align-items: center;

  width: 100%;
  height: 3.6rem;

  background-color: ${theme.colors.white};
  border-radius: 0.8rem;
`;

export const s_urlText = css`
  overflow: hidden;
  display: block;

  width: calc(100% - 3.6rem);
  height: 100%;
  padding: 0.8rem 0 0.8rem 0.8rem;

  color: ${theme.colors.grey.dark};
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;

  border-radius: 0.8rem;
`;

export const s_copyButtonContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 3.6rem;
  height: 3.6rem;
`;

export const s_copyButton = css`
  width: 100%;
  height: 100%;
  background-color: inherit;
  border-radius: 0.8rem;

  &:hover {
    opacity: 0.3;
  }
`;

const drawCheck = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

export const s_check = css`
  path {
    fill: none;
    stroke: ${theme.colors.green.deepDark};
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 8;

    animation: ${drawCheck} 0.8s ease-in-out forwards;
  }
`;

export const s_descriptionContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const s_description = css`
  h2 {
    ${theme.typography.bodyBold}
  }

  h3 {
    ${theme.typography.captionBold}
  }

  p {
    ${theme.typography.captionMedium}
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  span {
    ${theme.typography.captionMedium}
  }
`;

export const s_availableDatesContainer = css`
  display: grid;
  grid-template-columns: 1fr 10fr;
  gap: 0.4rem;
`;
