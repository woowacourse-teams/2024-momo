import type { PropsWithChildren } from 'react';

import { Button } from '../Button';
import { s_tabButton } from './TabButton.styles';
import type { TabButtonVariants } from './TabButton.types';

interface TabButtonProps extends PropsWithChildren {
  isActive: boolean;
  onClick: () => void;
  tabButtonVariants?: TabButtonVariants;
}

export default function TabButton({
  isActive,
  onClick,
  tabButtonVariants = 'default',
  children,
}: TabButtonProps) {
  return (
    <Button size="s" onClick={onClick} customCss={s_tabButton(isActive, tabButtonVariants)}>
      {children}
    </Button>
  );
}
