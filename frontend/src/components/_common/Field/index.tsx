import type { InputHTMLAttributes } from 'react';

import Input from '../Input';
import { s_description, s_field, s_label } from './Field.styles';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  description?: string;
}

export default function Field({ labelText, id, description = '', ...props }: FieldProps) {
  return (
    <div css={s_field}>
      <label css={s_label} htmlFor={id}>
        {labelText}
      </label>
      {description && <div css={s_description}>{description}</div>}
      <Input id={id} {...props} />
    </div>
  );
}
