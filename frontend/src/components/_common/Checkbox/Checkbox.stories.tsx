import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/internal/preview-api';

import Checkbox from '.';

const meta = {
  title: 'Common/Checkbox',
  component: Checkbox,
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
    id: 'checkbox',
    isChecked: false,
    labelText: '체크박스입니다.',
  },
};
