import type { SelectHTMLAttributes } from 'react';

import { s_dropdown } from './Dropdown.styles';

export type Option = {
  value: string;
  label: string;
};

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}

export default function Dropdown({ options, ...props }: DropdownProps) {
  return (
    <select {...props} css={s_dropdown}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
