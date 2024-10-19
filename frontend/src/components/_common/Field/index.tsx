import type { ReactNode } from 'react';

import FloatingInput from '@components/FloatingInput';

import Text from '../Text';
import {
  s_description,
  s_errorMessage,
  s_errorMessageWrapper,
  s_field,
  s_label,
} from './Field.styles';

interface FieldProps {
  children: ReactNode;
}

const Field = ({ children }: FieldProps) => {
  return <div css={s_field}>{children}</div>;
};

interface FieldTitleProps {
  title: string;
}

const FieldTitle = ({ title }: FieldTitleProps) => {
  return <Text typo="subTitleBold">{title}</Text>;
};

interface FieldLabelProps {
  id: string;
  labelText: string;
}

const FieldLabel = ({ id, labelText }: FieldLabelProps) => (
  <label css={s_label} htmlFor={id}>
    {labelText}
  </label>
);

interface FieldDescriptionProps {
  description?: string;
  accentText?: string;
}

const FieldDescription = ({ description }: FieldDescriptionProps) =>
  description ? <div css={s_description}>{description}</div> : null;

interface FieldErrorMessageProps {
  errorMessage: null | string;
}

const FieldErrorMessage = ({ errorMessage }: FieldErrorMessageProps) => (
  <div css={s_errorMessageWrapper}>
    {errorMessage && <div css={s_errorMessage}>{errorMessage}</div>}
  </div>
);

Field.Title = FieldTitle;
Field.Label = FieldLabel;
Field.Description = FieldDescription;
Field.ErrorMessage = FieldErrorMessage;
Field.FloatingInput = FloatingInput;

export default Field;
