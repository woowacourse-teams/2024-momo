import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';

import theme from '@styles/theme';

import type { TabButtonVariants } from './TabButton.types';

type TabButtonStyles = Record<TabButtonVariants, SerializedStyles>;

const ACTIVE_TAB_BUTTON_STYLES: TabButtonStyles = {
  default: css`
    color: #33272a;
    background-color: ${theme.colors.primary};
  `,
  outlinedFloating: css`
    background-color: #ffc2d0;
    border-radius: 8rem;
    box-shadow: inset 0 0 0 1px ${theme.colors.primary};
  `,
};

const INACTIVE_TAB_BUTTON_STYLES: TabButtonStyles = {
  default: css`
    color: #a1a1aa;
    background-color: #e4e4e7;
  `,
  outlinedFloating: css`
    color: #a1a1aa;
    background-color: #e4e4e7;
    border-radius: 999rem;
    box-shadow: inset 0 0 0 1px #a1a1aa;
  `,
};

export const s_tabButton = (
  isActive: boolean,
  tabButtonVariants: 'default' | 'outlinedFloating',
) => css`
  outline: 0 solid ${theme.colors.white};
  ${isActive
    ? ACTIVE_TAB_BUTTON_STYLES[tabButtonVariants]
    : INACTIVE_TAB_BUTTON_STYLES[tabButtonVariants]};
`;
