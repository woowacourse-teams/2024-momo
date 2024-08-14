import type { LabelHTMLAttributes, PropsWithChildren } from 'react';

import { s_description, s_errorText, s_field, s_label } from './Field.styles';

interface FieldProps extends LabelHTMLAttributes<HTMLLabelElement> {
  id: string;
  labelText: string;
  description?: string;
  error?: string | null;
  flexDirection?: string;
}

export default function Field({
  children,
  labelText,
  id,
  error,
  description = '',
}: PropsWithChildren<FieldProps>) {
  return (
    <div css={s_field}>
      <label css={s_label} htmlFor={id}>
        {labelText}
      </label>
      {description && <div css={s_description}>{description}</div>}
      {children}
      {error && <div css={s_errorText}>{error}</div>}
    </div>
  );
}
