import { css } from '@emotion/react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import useTimePick from '@hooks/useTimePick/useTimePick';

import type { MeetingSingleSchedule } from '@apis/schedules';

import { usePostScheduleMutation } from '@stores/servers/schedule/mutations';

import { s_buttonContainer, s_table, s_td, s_th, s_timeColumn, s_timeText } from '../Time.styles';
import { convertToSchedule, generateScheduleMatrix } from './TimePicker.util';

// export interface TimePickerProps {
//   data: GetMeetingResponse;
// }

// TODO

// - 한 사람의 데이터를 내려주는 것으로 변경(@해리)

// - 시간을 수정하기 위해서, 로그인 한 사용자의 시간 데이터를 활용해서 2차원 배열을 생성한다
// - 시간을 수정한 후, 전체 약속 정보 조회 캐싱을 무효화

interface TimePickerProps {
  firstTime: string;
  lastTime: string;
  availableDates: string[];
  meetingSchedules: MeetingSingleSchedule;
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

export default function TimePicker({
  firstTime,
  lastTime,
  availableDates,
  meetingSchedules,
}: TimePickerProps) {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const { isTimePickerUpdate, handleToggleIsTimePickerUpdate } = useContext(
    TimePickerUpdateStateContext,
  );

  const schedules = generateScheduleMatrix({
    firstTime,
    lastTime,
    availableDates,
    meetingSchedules,
  });

  const [ref, value] = useTimePick(isTimePickerUpdate, schedules);

  const { mutate: postScheduleMutate } = usePostScheduleMutation(() =>
    handleToggleIsTimePickerUpdate(),
  );

  const handleOnToggle = () => {
    const convert = convertToSchedule(value, availableDates, firstTime, lastTime);
    postScheduleMutate({ uuid, requestData: convert });
  };

  return (
    <div>
      <table css={s_table} ref={ref}>
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
          {value.map((row, rowIndex) => (
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
                    ${s_td(value[rowIndex][columnIndex])}
                  `}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div css={s_buttonContainer}>
        <button onClick={handleOnToggle}>등록하기</button>
      </div>
    </div>
  );
}
