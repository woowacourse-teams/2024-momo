import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';

import AttendeeTooltip from '.';

const meta: Meta<typeof AttendeeTooltip> = {
  title: 'Components/Tooltip/AttendeeTooltip',
  component: AttendeeTooltip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    attendeeNames: {
      control: { type: 'object' },
      description: '참여자 이름 배열',
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
      description: '툴팁 위치',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AttendeeTooltip>;

export const Playground: Story = {
  args: {
    attendeeNames: ['낙톼', '해뤼', '뷩봉', '돠욘', '폐듀료', '쟤증', '뫜크', '백희'],
    position: 'top',
  },
  render: (args) => {
    const s_td = css`
      position: relative;

      overflow: hidden;

      width: 10rem;
      max-width: 10rem;
      height: 4rem;

      text-overflow: ellipsis;
      white-space: nowrap;

      /* 나중에 theme와 합치기(@해리) */
      background-color: #ffebe8;
      border: 1px solid #eee;
    `;
    return (
      <table>
        <tbody>
          <tr>
            <td css={s_td}>
              <AttendeeTooltip attendeeNames={args.attendeeNames} position={args.position} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  },
};
