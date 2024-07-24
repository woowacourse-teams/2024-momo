import type { Meta, StoryObj } from '@storybook/react';

import Field from './index';

const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    inputProps: {
      control: 'object',
      description: 'Input 컴포넌트에 전달할 속성들',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '사용자 이름',
    description: '사용자 이름을 입력하세요.',
    inputProps: {
      type: 'text',
      placeholder: '사용자 이름을 입력하세요.',
    },
  },
};

export const WithDescription: Story = {
  args: {
    label: '이메일',
    description: '이메일 주소를 입력해 주세요.',
    inputProps: {
      type: 'email',
      placeholder: '이메일을 입력하세요.',
    },
  },
};

export const WithLongDescription: Story = {
  args: {
    label: '비밀번호',
    description: '비밀번호는 최소 8자 이상이어야 하며, 문자와 숫자를 혼합하여 입력해 주세요.',
    inputProps: {
      type: 'password',
      placeholder: '비밀번호를 입력하세요.',
    },
  },
};

export const WithoutDescription: Story = {
  args: {
    label: '검색',
    inputProps: {
      type: 'text',
      placeholder: '검색어를 입력하세요.',
    },
  },
};
