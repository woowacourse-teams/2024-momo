import type { Meta, StoryObj } from '@storybook/react';

import FloatingLabelInput from '.';

const meta = {
  title: 'Components/Inputs/FloatingLabelInput',
  component: FloatingLabelInput,
  argTypes: {
    label: { control: 'text' },
    isError: { control: 'boolean' },
  },
} satisfies Meta<typeof FloatingLabelInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '낙타해리빙봉',
    placeholder: '송재석최현웅김윤경',
    isError: false,
  },
};
