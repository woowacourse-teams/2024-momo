import type { Meta, StoryObj } from '@storybook/react';

import { INITIAL_END_TIME, INITIAL_START_TIME } from '@hooks/useTimeRangeDropdown/constants';
import {
  generateEndTimeOptions,
  generateStartTimeOptions,
} from '@hooks/useTimeRangeDropdown/useTimeRangeDropdown.utils';

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

export const StartTime: Story = {
  args: {
    options: generateStartTimeOptions(INITIAL_END_TIME),
  },
};

export const EndTime: Story = {
  args: {
    options: generateEndTimeOptions(INITIAL_START_TIME),
  },
};
