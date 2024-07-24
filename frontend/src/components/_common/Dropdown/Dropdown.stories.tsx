import type { Meta, StoryObj } from '@storybook/react';

import { generateTimeOptions } from '@hooks/useTimeRangeDropdown/useTimeRangeDropdown.utils';

import Dropdown from '.';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    options: {
      control: 'object',
      description: '드롭다운 목록에 추가할 `value`와 `label`을 담고있는 객체 배열입니다.',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      {
        value: '옵션 1',
        label: '옵션 1',
      },
      {
        value: '옵션 2',
        label: '옵션 2',
      },
      {
        value: '옵션 3',
        label: '옵션 3',
      },
      {
        value: '옵션 4',
        label: '옵션 4',
      },
      {
        value: '옵션 5',
        label: '옵션 5',
      },
    ],
  },
};

export const TimeDropdown: Story = {
  args: {
    options: generateTimeOptions(),
  },
};
