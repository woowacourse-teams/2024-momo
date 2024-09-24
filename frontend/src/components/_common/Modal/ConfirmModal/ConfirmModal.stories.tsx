import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useArgs } from 'storybook/internal/preview-api';

import theme from '@styles/theme';

import ConfirmModal from '.';

const meta = {
  title: 'common/Modal/Confirm',
  component: ConfirmModal,
  decorators: [
    (Story, context) => {
      const [{ isOpen }, setArgState] = useArgs();

      const handleButtonClick = () => setArgState({ isOpen: !isOpen });

      return (
        <>
          <button css={{ padding: '4px', border: '1px solid black' }} onClick={handleButtonClick}>
            Open ConfirmModal
          </button>
          <Story
            args={{
              ...context.args,
              onClose: handleButtonClick,
            }}
          />
        </>
      );
    },
  ],
} satisfies Meta<typeof ConfirmModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
    position: 'center',
    size: 'small',
    title: '입력하신 약속 정보를 확인해주세요.',
    content: (
      <div>
        <p>
          <span css={{ color: theme.colors.primary }}>약속이름: </span> 해빙낙 정기토론회
        </p>
        <p>
          <span css={{ color: theme.colors.primary }}>주최자: </span> 해리와빙봉
        </p>
        <p>
          <span css={{ color: theme.colors.primary }}>약속 시간: </span> 10:00 ~ 18:00
        </p>
        <p>
          <span css={{ color: theme.colors.primary }}>가능 날짜:</span> 어쩌고
        </p>
      </div>
    ),
  },
};

export const ButtonPositionColumn: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
    position: 'center',
    size: 'almostFull',
    title: '입력하신 약속 정보를 확인해주세요.',
    content: (
      <div>
        <p>
          <span css={{ color: theme.colors.primary }}>약속이름: </span> 해빙낙 정기토론회
        </p>
        <p>
          <span css={{ color: theme.colors.primary }}>주최자: </span> 해리와빙봉
        </p>
        <p>
          <span css={{ color: theme.colors.primary }}>약속 시간: </span> 10:00 ~ 18:00
        </p>
        <p>
          <span css={{ color: theme.colors.primary }}>가능 날짜:</span> 어쩌고
        </p>
      </div>
    ),
    buttonPosition: 'column',
  },
};
