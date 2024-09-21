import type { ButtonHTMLAttributes } from 'react';
import React from 'react';

import { Button } from '../Button';
import { s_bottomFixedButtonContainer, s_bottomFixedStyles } from './BottomFixedButton.styles';

interface BottomFixedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  height?: number;
  isLoading?: boolean;
}

export default function BottomFixedButton({
  children,
  height = 0,
  isLoading = false,
  ...props
}: BottomFixedButtonProps) {
  return (
    <div css={s_bottomFixedButtonContainer(height)}>
      <Button
        variant="primary"
        size="full"
        isLoading={isLoading}
        borderRadius={0}
        customCss={s_bottomFixedStyles}
        {...props}
      >
        {children}
      </Button>
      <div id="test"></div>
    </div>
  );
}
