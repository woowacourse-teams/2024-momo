import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';

import ToastProvider from '@contexts/ToastProvider';

import useToast from '@hooks/useToast/useToast';

import Toast from '.';
import { Button } from '../Buttons/Button';

const meta = {
  title: 'Components/Toast',
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

  decorators: [
    (Story) => {
      return (
        <ToastProvider>
          <div
            css={css`
              width: 43rem;
            `}
          >
            <Story />
          </div>
        </ToastProvider>
      );
    },
  ],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    isOpen: true,
    type: 'default',
    message: '안녕하세요, 내 이름은 기본 토스트입니다.',
  },

  render: (args) => {
    return <Toast {...args} />;
  },
};

export const Warning: Story = {
  args: {
    isOpen: true,
    type: 'warning',
    message: '안녕하세요, 내 이름은 경고 토스트입니다.',
  },

  render: (args) => {
    return <Toast {...args} />;
  },
};

export const Success: Story = {
  args: {
    isOpen: true,
    type: 'success',
    message: '안녕하세요, 내 이름은 성공 토스트입니다.',
  },

  render: (args) => {
    return <Toast {...args} />;
  },
};

export const ToastPlayground: Story = {
  render: () => {
    const { addToast } = useToast();

    const renderDefaultToast = () => {
      addToast({
        type: 'default',
        message: '안녕하세요, 내 이름은 기본 토스트입니다',
        duration: 3000,
      });
    };

    const renderSuccessToast = () => {
      addToast({
        type: 'success',
        message: '안녕하세요, 내 이름은 성공 토스트입니다',
        duration: 3000,
      });
    };

    const renderWarningToast = () => {
      addToast({
        type: 'warning',
        message: '안녕하세요, 내 이름은 경고 토스트입니다',
        duration: 3000,
      });
    };

    return (
      <div
        css={css`
          position: relative;

          display: flex;
          justify-content: center;

          width: 100%;
          height: 100vh;
        `}
      >
        <div
          css={css`
            position: absolute;
            bottom: 2.4rem;

            display: flex;
            flex-direction: column;
            row-gap: 1.2rem;
          `}
        >
          <Button variant="primary" size="s" onClick={renderDefaultToast}>
            기본 토스트 렌더링하기
          </Button>
          <Button variant="primary" size="s" onClick={renderSuccessToast}>
            성공 토스트 렌더링하기
          </Button>
          <Button variant="primary" size="s" onClick={renderWarningToast}>
            경고 토스트 렌더링하기
          </Button>
        </div>
      </div>
    );
  },
};
