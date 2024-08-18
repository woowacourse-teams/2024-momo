import type { Meta, StoryObj } from '@storybook/react';

import Field from './index';

const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field>
      <Field.Label id="userName" labelText="사용자 이름" />
      <Field.Description description="사용자 이름을 입력하세요." />
    </Field>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Field>
      <Field.Label id="email" labelText="이메일" />
      <Field.Description description="이메일 주소를 입력해 주세요." />
    </Field>
  ),
};

export const WithLongDescription: Story = {
  render: () => (
    <Field>
      <Field.Label id="password" labelText="비밀번호" />
      <Field.Description description="비밀번호는 최소 8자 이상이어야 하며, 문자와 숫자를 혼합하여 입력해 주세요." />
    </Field>
  ),
};

export const WithoutDescription: Story = {
  render: () => (
    <Field>
      <Field.Label id="search" labelText="검색" />
      <Field.Description />
    </Field>
  ),
};

export const WithErrorMessage: Story = {
  render: () => (
    <Field>
      <Field.Label id="emailWithError" labelText="이메일" />
      <Field.Description description="이메일 주소를 입력해 주세요." />
      <Field.ErrorMessage errorMessage="이메일 형식이 올바르지 않습니다." />
    </Field>
  ),
};
