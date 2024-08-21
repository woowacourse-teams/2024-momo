import type { Meta, StoryObj } from '@storybook/react';

import PasswordInput from './index';

const meta = {
  title: 'Components/Inputs/PasswordInput',
  component: PasswordInput,
  argTypes: {
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '비밀번호를 입력하세요.',
  },
};
