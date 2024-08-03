import type { Meta, StoryObj } from '@storybook/react';

import { SecondaryButton } from '.';

const meta = {
  title: 'Components/Button/SecondaryButton',
  tags: ['autodocs'],
  component: SecondaryButton,
  argTypes: {
    size: { control: 'radio' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof SecondaryButton>;

export default meta;

type Story = StoryObj<typeof meta>;

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
