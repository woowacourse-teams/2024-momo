import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'storybook/internal/preview-api';

import type { MeetingRecommend } from '@apis/meetings/recommends';

import MeetingRecommendCheckboxCard from './MeetingRecommendCheckboxCard';

const DEFAULT_SCHEDULE: MeetingRecommend = {
  rank: '1',
  startDate: '2024-07-15',
  startDayOfWeek: '월',
  startTime: '20:00',
  endDate: '2024-07-15',
  endDayOfWeek: '월',
  endTime: '21:00',
  attendeeNames: ['다온', '마크', '해리', '낙타', '빙봉', '재즈', '배키', '페드로'],
};

const meta: Meta<typeof MeetingRecommendCheckboxCard> = {
  title: 'MeetingRecommendCard/Checkbox',
  component: MeetingRecommendCheckboxCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    schedule: DEFAULT_SCHEDULE,
    totalAttendees: DEFAULT_SCHEDULE.attendeeNames,
  },
  decorators: (Story) => (
    <div css={{ width: '32rem' }}>
      <Story />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof MeetingRecommendCheckboxCard>;

export const DateTime: Story = {
  render: (args) => {
    const [isSelect, setIsSelect] = useState(false);

    const onToggle = () => {
      setIsSelect((prevIsSelected) => !prevIsSelected);
    };

    return (
      <MeetingRecommendCheckboxCard
        {...args}
        type="DATETIME"
        isSelected={isSelect}
        onSelect={onToggle}
      />
    );
  },
};

export const DaysOnly: Story = {
  render: (args) => {
    const [isSelect, setIsSelect] = useState(false);

    const onToggle = () => {
      setIsSelect((prevIsSelected) => !prevIsSelected);
    };

    return (
      <MeetingRecommendCheckboxCard
        {...args}
        type="DAYSONLY"
        isSelected={isSelect}
        onSelect={onToggle}
      />
    );
  },
};
