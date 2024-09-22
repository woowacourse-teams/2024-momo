import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/internal/preview-api';

import Checkbox from '.';

const meta = {
  title: 'Common/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story, context) => {
      const [{ isChecked }, setArgState] = useArgs();

      const onToggleIsChecked = () => {
        setArgState({ isChecked: !isChecked });
      };

      return (
        <Story
          args={{
            ...context.args,
            id: 'checkbox',
            onChange: onToggleIsChecked,
          }}
        />
      );
    },
  ],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isChecked: false,
    labelText: '체크박스입니다.',
  },
};
