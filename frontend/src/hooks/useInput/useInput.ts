import type { ChangeEvent } from 'react';
import { useState } from 'react';

interface ValidationRules {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

const useInput = (rules?: ValidationRules) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateInputValue = (input: string): string | null => {
    if (!rules) return null;

    if (rules.minLength && input.length < rules.minLength) {
      return `최소 ${rules.minLength}글자 이상이어야 합니다.`;
    }

    if (rules.maxLength && input.length > rules.maxLength) {
      return `최대 ${rules.maxLength}글자까지 입력 가능합니다.`;
    }

    if (rules.pattern && !rules.pattern.test(input)) {
      return '올바른 형식이 아닙니다.';
    }
    return null;
  };

  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    const validationError = validateInputValue(newValue);
    setError(validationError);
  };

  return {
    value,
    error,
    onValueChange,
  };
};

export default useInput;
