import { css } from '@emotion/react';

export const s_toastListContainer = css`
  position: fixed;
  z-index: 3;
  top: 9rem;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 43rem;
  padding: 0 1.6rem;
`;
