import type { Meta, StoryObj } from '@storybook/react';

import InformationIcon from '@assets/images/information.svg';

import Text from './';

const meta = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'caption', 'warning', 'accent'],
    },
    typo: {
      control: 'select',
      options: [
        'titleBold',
        'titleMedium',
        'subTitleBold',
        'subTitleMedium',
        'subTitleLight',
        'bodyBold',
        'bodyMedium',
        'bodyLight',
        'captionBold',
        'captionMedium',
        'captionLight',
      ],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '기본 텍스트입니다',
    variant: 'default',
    typo: 'bodyMedium',
  },
};

export const CaptionText: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
      <InformationIcon width="12" height="12" />
      <Text {...args} />
    </div>
  ),
  args: {
    variant: 'caption',
    typo: 'captionLight',
    children: '시간을 클릭하여 해당 시간에 참여할 수 있는 참여자들을 확인해 보세요',
  },
};

export const WelcomeText: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Text {...args} variant="accent">
        페드로
      </Text>
      <Text {...args}>님 반가워요 👋🏻</Text>
    </div>
  ),
};

export const TitleText: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Text {...args} variant="accent" typo="titleMedium">
        모모 런칭데이 회식
      </Text>
      <Text {...args} typo="titleMedium">
        약속 참여자들이 선택한 시간대를 알려드릴게요
      </Text>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: '텍스트를 여기에 입력하세요',
    variant: 'default',
    typo: 'bodyMedium',
  },
};
