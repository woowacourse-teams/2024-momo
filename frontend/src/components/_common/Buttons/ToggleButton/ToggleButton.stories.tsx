import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import ToggleButton from './index';

const meta = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const [{ isToggled }, setArgState] = useArgs();

      const handleClick = () => setArgState({ isToggled: !isToggled });

      return (
        <Story
          args={{
            ...context.args,
            isToggled,
            onClick: handleClick,
          }}
        />
      );
    },
  ],
} satisfies Meta<typeof ToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UnToggled: Story = {
  args: {
    id: 'toggle-button',
    isToggled: false,
    onClick: () => {},
  },
};

export const Toggled: Story = {
  args: {
    id: 'toggled-button',
    isToggled: true,
    onClick: () => {},
  },
};

export const WithLabel: Story = {
  args: {
    id: 'toggled-button',
    children: '응답 다시 받기',
    isToggled: true,
    onClick: () => {},
  },
};
