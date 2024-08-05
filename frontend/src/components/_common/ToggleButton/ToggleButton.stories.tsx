import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import ToggleButton from './index';

const meta = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const [{ isClicked }, setArgState] = useArgs();

      const handleClick = () => setArgState({ isClicked: !isClicked });

      return (
        <Story
          args={{
            ...context.args,
            isClicked,
            onClick: handleClick,
          }}
        />
      );
    },
  ],
} satisfies Meta<typeof ToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const False: Story = {
  args: {
    id: 'toggle-button',
    isClicked: false,
    onClick: () => {},
  },
};

export const True: Story = {
  args: {
    id: 'toggle-true-button',
    isClicked: true,
    onClick: () => {},
  },
};

export const WithLabel: Story = {
  args: {
    id: 'toggle-true-button',
    children: '응답 다시 받기',
    isClicked: true,
    onClick: () => {},
  },
};
