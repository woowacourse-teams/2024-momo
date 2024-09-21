import type { ChangeEvent } from 'react';
import { useState } from 'react';

import type { UseInputResult } from './useInput.type';

interface ValidationRules {
  pattern?: RegExp;
  errorMessage?: string;
}

const useInput = (rules?: ValidationRules): UseInputResult => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getValidationError = (input: string) => {
    if (!rules) return null;

    if (rules.pattern && !rules.pattern.test(input)) {
      return rules.errorMessage || '올바른 형식이 아닙니다.';
    }

    return null;
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const validationError = getValidationError(newValue);

    setValue(newValue);
    setErrorMessage(validationError);
  };

  return {
    value,
    errorMessage,
    onValueChange: handleValueChange,
  };
};

export default useInput;
