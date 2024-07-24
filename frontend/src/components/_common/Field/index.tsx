import type { InputHTMLAttributes } from 'react';

import Input from '../Input';
import { s_description, s_field, s_label } from './Field.styles';

interface FieldProps {
  label: string;
  description?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export default function Field({ label, description = '', inputProps }: FieldProps) {
  return (
    <div css={s_field}>
      <label css={s_label} htmlFor={label}>
        {label}
      </label>
      {description && <div css={s_description}>{description}</div>}
      <Input id={label} {...inputProps} />
    </div>
  );
}
