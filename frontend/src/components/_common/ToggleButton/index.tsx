import type { PropsWithChildren } from 'react';

import { s_buttonContainer, s_container, s_input } from './ToggleButton.styles';

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
      <label
        aria-label="토글체크버튼"
        htmlFor={id}
        onClick={onClick}
        css={s_buttonContainer(isToggled)}
      />
      <input type="checkbox" id={id} checked={isToggled} css={s_input} />
    </div>
  );
}
