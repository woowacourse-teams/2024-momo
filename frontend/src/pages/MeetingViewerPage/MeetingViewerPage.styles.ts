import { css } from '@emotion/react';

export const s_container = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  width: 100%;
  height: 100%;
`;

export const s_pageHeader = css`
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  margin-bottom: 1.2rem;
`;

export const s_toggleButtonContainer = css`
  display: flex;
  gap: 0.8rem;
  justify-content: right;
  width: 100%;
`;

export const s_contentDivider = css`
  width: calc(100% + 1.6rem * 2);
  height: 0.4rem;
  margin: 1.6rem 0 0 -1.6rem;
  background-color: #f6f6f6;
`;
