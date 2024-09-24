import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { Button } from '../Button';
import { s_tabButton } from './TabButton.styles';
import type { TabButtonVariants } from './TabButton.types';

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  onClick: () => void;
  tabButtonVariants?: TabButtonVariants;
  children: ReactNode;
}

export default function TabButton({
  isActive,
  onClick,
  tabButtonVariants = 'default',
  children,
  ...props
}: TabButtonProps) {
  return (
    <Button
      size="s"
      onClick={onClick}
      customCss={s_tabButton(isActive, tabButtonVariants)}
      {...props}
    >
      {children}
    </Button>
  );
}
