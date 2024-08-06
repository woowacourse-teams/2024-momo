import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '.';

const meta = {
  title: 'Components/Button',
  tags: ['autodocs'],
  component: Button,
  argTypes: {
    size: { control: 'radio' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'm',
    onClick: () => {},
    children: '버튼',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'm',
    onClick: () => {},
    children: '버튼',
  },
};

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
    onClick: () => {},
    children: '버튼',
  },
};

export const Small: Story = {
  args: {
    size: 's',
    onClick: () => {},
    children: '버튼',
  },
};

export const Medium: Story = {
  args: {
    size: 'm',
    onClick: () => {},
    children: '버튼',
  },
};

export const Full: Story = {
  args: {
    size: 'full',
    onClick: () => {},
    children: '버튼',
  },
};

export const FullWithNoBorderRadius: Story = {
  args: {
    size: 'full',
    borderRadius: 0,
    onClick: () => {},
    children: '버튼',
  },
};
