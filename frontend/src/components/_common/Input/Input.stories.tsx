import type { Meta, StoryObj } from '@storybook/react';

import Input from './index';

const meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: '텍스트를 입력하세요.',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호를 입력하세요.',
  },
};

export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: '비활성화된 입력 필드',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    type: 'text',
    placeholder: '미리 채워진 텍스트',
    value: '기본 텍스트',
  },
};
