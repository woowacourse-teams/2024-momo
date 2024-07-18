import type { Meta, StoryObj } from '@storybook/react';

import Button from './index';

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    text: { control: 'text' },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Default Button',
  },
};

export const Disabled: Story = {
  args: {
    text: 'Disabled Button',
    disabled: true,
  },
};

export const CustomText: Story = {
  args: {
    text: 'Custom Text Button',
  },
};
