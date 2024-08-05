import type { PropsWithChildren } from 'react';

import { s_buttonContainer, s_container, s_input, s_switch } from './ToggleButton.styles';

interface ToggleButtonProps {
  id: string;
  isClicked: boolean;
  onClick: () => void;
}

export default function ToggleButton({
  id,
  children,
  isClicked,
  onClick,
}: PropsWithChildren<ToggleButtonProps>) {
  return (
    <div css={s_container}>
      {children}
      <label htmlFor={id} onClick={onClick} css={s_buttonContainer(isClicked)}>
        <span css={s_switch}>선택</span>
      </label>
      <input type="checkbox" id={id} checked={isClicked} css={s_input} />
    </div>
  );
}
