import { css } from '@emotion/react';

export const s_container = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: calc(100vh - 6rem);
`;

export const s_inputContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 90%;
  height: 16rem;
  padding: 1.6rem;

  background-color: #f7dacb;
  border-radius: 0.5rem;
`;

export const s_button = css`
  width: 90%;
  height: 3rem;
`;
