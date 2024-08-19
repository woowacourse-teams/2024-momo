import type { Meta } from '@storybook/react';

import useTimeRangeDropdown from '@hooks/useTimeRangeDropdown/useTimeRangeDropdown';

import TimeRangeSelector from '.';

const meta = {
  title: 'Components/TimeRangeSelector',
  component: TimeRangeSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

  decorators: [
    (Story, context) => {
      const { startTime, endTime, handleStartTimeChange, handleEndTimeChange } =
        useTimeRangeDropdown();

      return (
        <Story
          args={{
            ...context.args,
            startTime,
            endTime,
            handleStartTimeChange,
            handleEndTimeChange,
          }}
        />
      );
    },
  ],
} satisfies Meta<typeof TimeRangeSelector>;

export default meta;

export const Default = {};
