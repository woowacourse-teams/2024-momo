import { useContext, useMemo } from 'react';

import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import Button from '@components/_common/Button';
import TimeSlot from '@components/_common/TimeSlot';

import useTimePick from '@hooks/useTimePick/useTimePick';

import type { GetMeetingResponse } from '@apis/meetings';

import { usePostScheduleMutation } from '@stores/servers/schedule/mutations';

import { s_buttonContainer, s_cell, s_table, s_th } from '../Time.styles';
import { convertToSchedule, generateScheduleMatrix } from './TimePicker.util';

export interface TimePickerProps {
  data: GetMeetingResponse;
}

export default function TimePicker({ data }: TimePickerProps) {
  const { isTimePickerUpdate, handleToggleIsTimePickerUpdate } = useContext(
    TimePickerUpdateStateContext,
  );

  const initialValue = useMemo(() => generateScheduleMatrix(data), [data]);
  const [ref, value] = useTimePick(isTimePickerUpdate, initialValue);

  const { mutate: postScheduleMutate } = usePostScheduleMutation(() =>
    handleToggleIsTimePickerUpdate(),
  );

  const handleOnToggle = () => {
    const convert = convertToSchedule(value, data.availableDates, data.startTime, data.endTime);

    postScheduleMutate(convert);
  };

  const formattedAvailableDates = ['', ...data.availableDates];

  return (
    <div>
      <table css={s_table} ref={ref}>
        <thead>
          <tr>
            {formattedAvailableDates.map((date) => (
              <th key={date}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {value.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th css={[s_cell, s_th]}>
                {String(rowIndex + Number(data.startTime.slice(0, 2)) + ':00')}
              </th>
              {row.map((_, columnIndex) => (
                <TimeSlot
                  key={rowIndex + columnIndex}
                  isSelected={value[rowIndex][columnIndex]}
                  isUpdate={isTimePickerUpdate}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div css={s_buttonContainer}>
        <Button text="등록하기" onClick={handleOnToggle} />
      </div>
    </div>
  );
}
