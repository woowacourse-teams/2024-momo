import type { LabelHTMLAttributes, PropsWithChildren } from 'react';

import { s_description, s_field, s_label } from './Field.styles';

interface FieldProps extends LabelHTMLAttributes<HTMLLabelElement> {
  id: string;
  labelText: string;
  description?: string;
  flexDirection?: string;
}

export default function Field({
  children,
  labelText,
  id,
  description = '',
}: PropsWithChildren<FieldProps>) {
  return (
    <div css={s_field}>
      <label css={s_label} htmlFor={id}>
        {labelText}
      </label>
      {description && <div css={s_description}>{description}</div>}
      {children}
    </div>
  );
}
