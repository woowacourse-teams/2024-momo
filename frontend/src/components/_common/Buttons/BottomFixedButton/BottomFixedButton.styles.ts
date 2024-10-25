import { css } from '@emotion/react';

export const s_bottomFixedStyles = css`
  width: calc(100% + 1.6rem * 2);
  max-width: 43rem;

  /* 버튼 컴포넌트의 full variants를 사용하려고 했으나 6rem보다 height값이 작아 직접 높이를 정의했어요(@해리) 
     full 버튼에 이미 의존하고 있는 컴포넌트들이 많아서 높이를 full 스타일을 변경할 수는 없었습니다.
     
     버튼의 높이가 너무 높다는 피드백을 반영하기 위해서 높이 수정 5.2rem(@해리)
  */
  height: 5.2rem;
  box-shadow: 0 -4px 4px rgb(0 0 0 / 25%);
`;

export const s_bottomFixedButtonContainer = (height = 0) => css`
  position: fixed;
  bottom: 0;
  left: 0;
  transform: translateY(-${height}px);

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 5.2rem;

  background-color: transparent;
`;
