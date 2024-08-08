import type { Meta, StoryObj } from '@storybook/react';

import Tooltip from '.';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    content: {
      description: '툴팁 내용',
      type: 'function',
      control: {
        disable: true,
      },
    },
    children: {
      description: '툴팁 트리거 컴포넌트',
      type: 'function',
      control: {
        disable: true,
      },
    },
    position: {
      control: {
        type: 'select',
        options: [
          'top',
          'left',
          'right',
          'bottom',
          'topLeft',
          'topRight',
          'bottomLeft',
          'bottomRight',
          'leftTop',
          'leftBottom',
          'rightTop',
          'rightBottom',
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  args: {
    content: <div>안녕하세요 툴팁입니다</div>,
    children: <button>마우스를 올려보세요</button>,
    position: 'top',
  },
  render: (args) => {
    return (
      <Tooltip content={args.content} position={args.position}>
        {args.children}
      </Tooltip>
    );
  },
};
