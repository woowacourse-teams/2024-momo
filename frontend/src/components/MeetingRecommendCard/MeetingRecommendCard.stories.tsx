import type { Meta, StoryObj } from '@storybook/react';

import type { MeetingRecommend } from '@apis/meetings/recommends';

import MeetingRecommendCard from './MeetingRecommendCard';

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

const meta: Meta<typeof MeetingRecommendCard> = {
  title: 'MeetingRecommendCard/Default',
  component: MeetingRecommendCard,
  parameters: {
    layout: 'centered',
  },
  decorators: (Story) => (
    <div css={{ width: '32rem' }}>
      <Story />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DateTime: Story = {
  args: {
    schedule: DEFAULT_SCHEDULE,
    totalAttendeeCount: DEFAULT_SCHEDULE.attendeeNames.length,
    type: 'DATETIME',
  },
};

export const DaysOnly: Story = {
  args: {
    schedule: DEFAULT_SCHEDULE,
    totalAttendeeCount: DEFAULT_SCHEDULE.attendeeNames.length,
    type: 'DAYSONLY',
  },
};
