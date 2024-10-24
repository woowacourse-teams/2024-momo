import type { CSSProperties, PropsWithChildren } from 'react';

import Accent from './Accent';
import { s_textStyles } from './Text.styles';
import type { TextTypo, TextVariant } from './Text.types';

interface TextProps extends PropsWithChildren {
  variant?: TextVariant;
  typo?: TextTypo;
  textAlign?: CSSProperties['textAlign'];
}

export default function Text({
  variant = 'default',
  typo = 'bodyMedium',
  textAlign = 'left',
  children,
}: TextProps) {
  return <p css={s_textStyles({ variant, typo, textAlign })}>{children}</p>;
}

Text.Accent = Accent;
