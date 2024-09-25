import type { Meta, StoryObj } from '@storybook/react';

import useMeetingConfirmCalendar from '@hooks/useMeetingConfirmCalendar/useMeetingConfirmCalendar';

import { getFullDate } from '@utils/date';

import MeetingConfirmCalendar from '.';

const schedules = [
  {
    date: '2024-10-24',
    time: '00:00',
    attendeeNames: ['모모', '행성이', '뚜리'],
  },
  {
    date: '2024-10-27',
    time: '00:00',
    attendeeNames: ['모모', '행성이', '뚜리'],
  },
  {
    date: '2024-11-12',
    time: '00:00',
    attendeeNames: ['모모', '행성이', '뚜리'],
  },
  {
    date: getFullDate(new Date()),
    time: '00:00',
    attendeeNames: ['모모', '행성이', '뚜리'],
  },
  {
    date: '2024-09-30',
    time: '00:00',
    attendeeNames: ['모모', '행성이', '뚜리'],
  },
];

const meta: Meta<typeof MeetingConfirmCalendar> = {
  title: 'Calendar/MeetingConfirmCalendar',
  component: MeetingConfirmCalendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof MeetingConfirmCalendar>;

export const ViewMode: Story = {
  render: () => {
    const { handleSelectedDate, hasDate } = useMeetingConfirmCalendar(schedules);

    return (
      <MeetingConfirmCalendar
        isTimePickerUpdate={false}
        handleSelectedDate={handleSelectedDate}
        hasDate={hasDate}
        schedules={schedules}
      />
    );
  },
};

export const UpdateMode: Story = {
  render: () => {
    const { handleSelectedDate, hasDate } = useMeetingConfirmCalendar(schedules);

    return (
      <MeetingConfirmCalendar
        isTimePickerUpdate={true}
        handleSelectedDate={handleSelectedDate}
        hasDate={hasDate}
        schedules={schedules}
      />
    );
  },
};
