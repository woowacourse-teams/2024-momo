import type { PropsWithChildren } from 'react';

import Accent from './Accent';
import { s_textStyles } from './Text.styles';
import type { TextTypo, TextVariant } from './Text.types';

interface TextProps extends PropsWithChildren {
  variant?: TextVariant;
  typo?: TextTypo;
}

export default function Text({ variant = 'default', typo = 'bodyMedium', children }: TextProps) {
  return (
    <p css={s_textStyles({ variant, typo })} role="text">
      {children}
    </p>
  );
}

Text.Accent = Accent;
