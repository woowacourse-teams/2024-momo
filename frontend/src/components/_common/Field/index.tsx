import type { InputHTMLAttributes } from 'react';

import Input from '../Input';

interface FieldProps {
  label: string;
  description?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export default function Field({ label, description = '', inputProps }: FieldProps) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <div>{description}</div>
      <Input id={label} {...inputProps} />
    </div>
  );
}
