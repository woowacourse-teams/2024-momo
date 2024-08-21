import { css } from '@emotion/react';

// 테이블의 시간 범위가 길어지는 경우, Header가 가리는 문제를 해결하기 위해 z-index 수정(@해리)
export const s_header = css`
  position: sticky;
  z-index: 1;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 6rem;
  padding: 0 1.6rem;

  background-color: #fff;
  box-shadow: 0 4px 4px rgb(0 0 0 / 25%);
`;

export const s_logoContainer = css`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  height: 3.6rem;
`;

export const s_title = css`
  font-size: 2.4rem;
  font-weight: 800;
`;
