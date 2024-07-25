import type { Meta, StoryObj } from '@storybook/react';

import Field from './index';

const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
  argTypes: {
    labelText: { control: 'text' },
    description: { control: 'text' },
    id: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labelText: '사용자 이름',
    description: '사용자 이름을 입력하세요.',
    type: 'text',
    id: 'userName',
    placeholder: '사용자 이름을 입력하세요.',
  },
};

export const WithDescription: Story = {
  args: {
    labelText: '이메일',
    description: '이메일 주소를 입력해 주세요.',
    type: 'email',
    id: 'email',
    placeholder: '이메일을 입력하세요.',
  },
};

export const WithLongDescription: Story = {
  args: {
    labelText: '비밀번호',
    description: '비밀번호는 최소 8자 이상이어야 하며, 문자와 숫자를 혼합하여 입력해 주세요.',
    type: 'password',
    id: 'password',
    placeholder: '비밀번호를 입력하세요.',
  },
};

export const WithoutDescription: Story = {
  args: {
    labelText: '검색',
    type: 'text',
    id: 'search',
    placeholder: '검색어를 입력하세요.',
  },
};
