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
    // 아이콘 + 텍스트를 조합해서 사용하는 쪽에서 gap을 결정해서 사용하면 됩니다. (@해리)
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
  render: () => (
    <Text>
      <Text.Accent text="페드로" />님 반가워요 👋🏻
    </Text>
  ),
};

export const TitleText: Story = {
  render: () => (
    <Text typo="titleMedium">
      <Text.Accent text="모모 런칭데이 회식" />
      약속 참여자들이 선택한 시간대를 알려드릴게요
    </Text>
  ),
};

export const Playground: Story = {
  args: {
    children: '텍스트를 여기에 입력하세요',
    variant: 'default',
    typo: 'bodyMedium',
  },
};
