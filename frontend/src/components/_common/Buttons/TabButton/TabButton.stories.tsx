import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';

import Text from '@components/_common/Text';

import Check from '@assets/images/attendeeCheck.svg';

import TabButton from '.';

const meta = {
  title: 'Components/Button/TabButton',
  component: TabButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isActive: {
      type: 'boolean',
    },
    tabButtonVariants: {
      control: 'select',
      options: ['default', 'outlinedFloating'],
    },
    onClick: {
      type: 'function',
    },
  },
} satisfies Meta<typeof TabButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isActive: false,
    onClick: () => {},
    children: '버튼',
  },
};

export const Playground: Story = {
  args: {
    isActive: false,
    tabButtonVariants: 'default',
    onClick: () => console.log('hi'),
    children: <Text typo="captionBold">Tab Button</Text>,
  },
};

export const AttendeeFilteringButton: Story = {
  args: {},
  render: (args) => (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1.2rem;
      `}
    >
      <TabButton
        tabButtonVariants="outlinedFloating"
        isActive={true}
        onClick={() => console.log('.')}
      >
        <Check width="16" height="16" />
        페드로
      </TabButton>
      <TabButton
        tabButtonVariants="outlinedFloating"
        isActive={false}
        onClick={() => console.log('.')}
      >
        해리
      </TabButton>
    </div>
  ),
};

export const TimeSelectModeButton: Story = {
  args: {},
  render: (args) => (
    <div
      css={css`
        display: flex;
        gap: 1.2rem;
      `}
    >
      <TabButton isActive={true} onClick={() => console.log('.')}>
        되는
      </TabButton>
      <TabButton isActive={false} onClick={() => console.log('.')}>
        안되는
      </TabButton>
    </div>
  ),
};
