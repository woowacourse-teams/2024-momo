import type { InputHTMLAttributes } from 'react';
import React from 'react';

import { s_container } from './Checkbox.styles';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
  labelText: string;
  id: string;
}

export default function Checkbox({ isChecked, id, labelText, ...props }: CheckboxProps) {
  return (
    <div css={s_container}>
      <input id={id} checked={isChecked} type="checkbox" {...props} />
      <label htmlFor={id}>{labelText}</label>
    </div>
  );
}
