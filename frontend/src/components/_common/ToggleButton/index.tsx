import type { PropsWithChildren } from 'react';

import { s_buttonContainer, s_container, s_input, s_switch } from './ToggleButton.styles';

interface ToggleButtonProps {
  id: string;
  isToggled: boolean;
  onClick: () => void;
}

export default function ToggleButton({
  id,
  children,
  isToggled,
  onClick,
}: PropsWithChildren<ToggleButtonProps>) {
  return (
    <div css={s_container}>
      {children}
      <label htmlFor={id} onClick={onClick} css={s_buttonContainer(isToggled)}>
        <span css={s_switch}>선택</span>
      </label>
      <input type="checkbox" id={id} checked={isToggled} css={s_input} />
    </div>
  );
}
