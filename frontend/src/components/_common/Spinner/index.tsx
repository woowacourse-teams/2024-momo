import type { CSSProperties } from 'react';

import { s_spinner, s_spinnerContainer } from './Spinner.styles';

interface SpinnerProps {
  backgroundColor: CSSProperties['color'];
}

export default function Spinner({ backgroundColor }: SpinnerProps) {
  return (
    <div css={s_spinnerContainer}>
      <div css={s_spinner(backgroundColor)}></div>
      <div css={s_spinner(backgroundColor)}></div>
      <div css={s_spinner(backgroundColor)}></div>
      <div css={s_spinner(backgroundColor)}></div>
      <div css={s_spinner(backgroundColor)}></div>
      <div css={s_spinner(backgroundColor)}></div>
      <div css={s_spinner(backgroundColor)}></div>
      <div css={s_spinner(backgroundColor)}></div>
    </div>
  );
}
