import { css } from '@emotion/react';

export const s_globalContainer = css`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  min-width: 39.3rem;
  max-width: 60rem;
  height: 100%;

  background-color: #fff;
  box-shadow: rgb(100 100 111 / 20%) 0 7px 29px 0;
`;

export const s_content = css`
  overflow-y: scroll;
  height: calc(100vh - 8.4rem);
  padding: 0 1.6rem;
`;
