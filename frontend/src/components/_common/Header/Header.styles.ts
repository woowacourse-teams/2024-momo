import { css } from '@emotion/react';

import theme from '@styles/theme';

// 테이블의 시간 범위가 길어지는 경우, Header가 가리는 문제를 해결하기 위해 z-index 수정(@해리)
export const s_header = css`
  position: sticky;
  z-index: 1;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 4.8rem;
  padding: 0 1.6rem;

  text-align: center;

  background-color: #fff;
  box-shadow: 0 4px 4px rgb(0 0 0 / 25%);
`;

export const s_title = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: ${theme.typography.bodyBold};
`;
