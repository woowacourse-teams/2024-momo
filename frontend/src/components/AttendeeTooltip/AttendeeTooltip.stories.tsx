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
    allSchedules: {
      control: { type: 'object' },
      description: '전체 스케줄 데이터',
    },
    availableDates: {
      control: { type: 'object' },
      description: '사용 가능한 날짜 배열',
    },
    rowIndex: {
      control: { type: 'number' },
      description: '행 인덱스',
    },
    columnIndex: {
      control: { type: 'number' },
      description: '열 인덱스',
    },
    firstTime: {
      control: { type: 'text' },
      description: '첫 시간',
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
    allSchedules: {
      schedules: [{ date: '2024-08-04', time: '10:00', attendeeNames: ['해뤼', '놕톼', '뷩봉'] }],
    },
    availableDates: ['2024-08-04'],
    rowIndex: 0,
    columnIndex: 0,
    firstTime: '10:00',
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
              <AttendeeTooltip
                allSchedules={args.allSchedules}
                availableDates={args.availableDates}
                rowIndex={args.rowIndex}
                columnIndex={args.columnIndex}
                firstTime={args.firstTime}
                position={args.position}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  },
};
