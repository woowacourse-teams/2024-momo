import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import Button from '@components/_common/Button';

import { handleGetMeetingSchedules } from '@apis/getMeetingSchedules';

import { QUERY_KEY } from '@constants/queryKeys';

import { generateScheduleMatrix } from '../Picker/TimePicker.util';
import { s_buttonContainer, s_table, s_td, s_th, s_timeColumn, s_timeText } from '../Time.styles';

interface TimeViewerProps {
  firstTime: string;
  lastTime: string;
  availableDates: string[];
  selectedAttendee: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

  return {
    dayOfWeek,
    monthDate: `${month}/${day}`,
  } as const;
};

const formatTime = (time: string) => {
  const hour = parseInt(time);
  const hourPrefix = hour >= 12 ? '오후' : '오전';

  return `${hourPrefix} ${hour % 12 || 12}시`;
};

export default function TimeViewer({
  firstTime,
  lastTime,
  availableDates,
  selectedAttendee,
}: TimeViewerProps) {
  const { handleToggleIsTimePickerUpdate } = useContext(TimePickerUpdateStateContext);
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const { data: meetingSchedules } = useQuery({
    queryKey: [QUERY_KEY.meetingSchedules, selectedAttendee],
    queryFn: () => handleGetMeetingSchedules({ uuid, attendeeName: selectedAttendee }),
    staleTime: 0,
  });

  const schedules = generateScheduleMatrix({
    firstTime,
    lastTime,
    availableDates,
    meetingSchedules,
  });

  return (
    <div>
      <table css={s_table} aria-label="약속 시간 조회 테이블">
        <thead>
          <tr>
            <th css={s_th}></th>
            {availableDates.map((date) => {
              const { dayOfWeek, monthDate } = formatDate(date);
              return (
                <th key={date} css={s_th}>
                  <span>{dayOfWeek}</span>
                  <br />
                  <span>{monthDate}</span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {schedules.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td css={s_timeColumn}>
                <span css={s_timeText}>
                  {formatTime(`${rowIndex + parseInt(firstTime.slice(0, 2))}:00`)}
                </span>
              </td>
              {row.map((_, columnIndex) => (
                <td
                  key={columnIndex}
                  css={css`
                    ${s_td(schedules[rowIndex][columnIndex])}
                  `}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div css={s_buttonContainer}>
        <Button text="수정하기" onClick={handleToggleIsTimePickerUpdate} />
      </div>
    </div>
  );
}
