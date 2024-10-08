import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';

import Toast from '.';

const meta = {
  title: 'Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    message: {
      control: {
        type: 'text',
      },
      description: '토스트 UI를 통해 사용자에게 전달할 메시지입니다.',
    },
    type: {
      control: {
        type: 'select',
      },
      options: ['default', 'warning', 'success'],
    },
    isOpen: {
      control: {
        type: 'boolean',
      },
      description: '토스트 UI에 애니메이션을 적용하기 위한 추가 상태입니다.',
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    type: 'default',
    message: '안녕하세요, 내 이름은 기본 토스트입니다.',
  },

  render: (args) => {
    return (
      <div
        css={css`
          width: 43rem;
        `}
      >
        <Toast {...args} />
      </div>
    );
  },
};

export const Warning: Story = {
  args: {
    isOpen: true,
    type: 'warning',
    message: '안녕하세요, 내 이름은 경고 토스트입니다.',
  },

  render: (args) => {
    return (
      <div
        css={css`
          width: 43rem;
        `}
      >
        <Toast {...args} />
      </div>
    );
  },
};

export const Success: Story = {
  args: {
    isOpen: true,
    type: 'success',
    message: '안녕하세요, 내 이름은 성공 토스트입니다.',
  },

  render: (args) => {
    return (
      <div
        css={css`
          width: 43rem;
        `}
      >
        <Toast {...args} />
      </div>
    );
  },
};
