import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Button from './index';
import Calendar from './index';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },
  argTypes: {
    hasDate: {
      description: '선택된 날짜들',
      type: 'function',
      control: {
        disable: true,
      },
    },
    onDateClick: {
      description: '선택된 날짜 리스트에 특정 날짜를 추가하거나 제거할 수 있는 함수',
    },
  },
  decorators: [
    (Story, context) => {
      const [selectedDates, setSelectedDates] = useState<string[]>([]);

      const hasDate = (date: string) => selectedDates.includes(date);

      const handleDateClick = (date: string) => {
        setSelectedDates((prevDates) =>
          hasDate(date) ? prevDates.filter((d) => d !== date) : [...prevDates, date],
        );
      };

      return (
        <Story
          args={{
            ...context.args,
            hasDate,
            onDateClick: handleDateClick,
          }}
        />
      );
    },
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    hasDate: () => false,
    onDateClick: () => {},
  },
  render: (args) => {
    return <Calendar hasDate={args.hasDate} onDateClick={args.onDateClick} />;
  },
};
