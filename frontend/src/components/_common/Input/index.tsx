import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ type = 'text', placeholder = '', ...props }: InputProps) {
  return <input type={type} placeholder={placeholder} {...props} />;
}
