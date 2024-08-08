import { css } from '@emotion/react';
import { useContext } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';

import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import Button from '@components/_common/Button';

import usePagedTimePick from '@hooks/usePagedTimePick/usePagedTimePick';

import type { MeetingSingleSchedule } from '@apis/schedules';

import { usePostScheduleMutation } from '@stores/servers/schedule/mutations';

import {
  s_buttonContainer,
  s_container,
  s_datesControlButton,
  s_datesControlButtonContainer,
  s_scheduleTable,
  s_tableHeaderCell,
  s_tableTimeHeaderCell,
  s_td,
  s_timeColumn,
  s_timeText,
} from '../Schedules.styles';
import { formatDate, formatTime } from '../Schedules.util';
import { convertToSchedule, generateScheduleMatrix } from './SchedulePicker.utils';

interface SchedulePickerProps {
  firstTime: string;
  lastTime: string;
  availableDates: string[];
  meetingSchedules: MeetingSingleSchedule;
}

export default function SchedulePicker({
  firstTime,
  lastTime,
  availableDates,
  meetingSchedules,
}: SchedulePickerProps) {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const { handleToggleIsTimePickerUpdate } = useContext(TimePickerUpdateStateContext);

  const schedules = generateScheduleMatrix({
    firstTime,
    lastTime,
    availableDates,
    meetingSchedules,
  });

  const {
    tableRef,
    tableValue,
    currentTableValue,
    currentDates,
    isMultiPage,
    increaseDatePage,
    decreaseDatePage,
    isFirstPage,
    isLastPage,
  } = usePagedTimePick(availableDates, schedules);

  const { mutate: postScheduleMutate } = usePostScheduleMutation(() =>
    handleToggleIsTimePickerUpdate(),
  );

  const handleOnToggle = () => {
    const convert = convertToSchedule(tableValue, availableDates, firstTime, lastTime);
    postScheduleMutate({ uuid, requestData: convert });
  };

  return (
    <section
      css={css`
        position: relative;
      `}
    >
      {isMultiPage && (
        <div css={s_datesControlButtonContainer}>
          <button
            css={s_datesControlButton}
            onClick={() => decreaseDatePage()}
            disabled={isFirstPage}
          >
            {'<'}
          </button>
          <button
            css={s_datesControlButton}
            onClick={() => increaseDatePage()}
            disabled={isLastPage}
          >
            {'>'}
          </button>
        </div>
      )}
      <div css={s_container}>
        <table css={s_scheduleTable} ref={tableRef} aria-label="약속 시간 수정 테이블">
          <thead>
            <tr>
              <th css={s_tableTimeHeaderCell}></th>
              {currentDates.map((date) => {
                const { dayOfWeek, monthDate } = formatDate(date);
                return (
                  <th key={date} css={s_tableHeaderCell}>
                    <span>{dayOfWeek}</span>
                    <br />
                    <span>{monthDate}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {currentTableValue.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td css={s_timeColumn}>
                  <span css={s_timeText}>
                    {formatTime(`${rowIndex + parseInt(firstTime.slice(0, 2))}:00`)}
                  </span>
                </td>
                {row.map((_, columnIndex) => (
                  <td key={columnIndex} css={s_td(currentTableValue[rowIndex][columnIndex])} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div css={s_buttonContainer}>
        <Button text="등록하기" onClick={handleOnToggle} />
      </div>
    </section>
  );
}
