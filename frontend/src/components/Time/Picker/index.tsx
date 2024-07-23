import { useContext, useMemo } from 'react';

import { UpdateStateContext } from '@contexts/updateStateProvider';

import Button from '@components/_common/Button';
import TimeSlot from '@components/_common/TimeSlot';

import useTimePick from '@hooks/useTimePick/useTimePick';

import type { GetMeetingResponse } from '@apis/getMeeting';

import { usePostScheduleMutation } from '@stores/servers/meeting/mutations';

import { buttonContainer, styledTh, table, tableTexture } from '../Time.styles';
import { convertToSchedule, generateScheduleMatrix } from './TimePicker.util';

export interface TimePickerProps {
  data: GetMeetingResponse;
}

export default function TimePicker({ data }: TimePickerProps) {
  const { isUpdate, handleToggleIsUpdate } = useContext(UpdateStateContext);

  const initialValue = useMemo(() => generateScheduleMatrix(data), [data]);
  const [ref, value] = useTimePick(isUpdate, initialValue);

  const { mutate: postScheduleMutate } = usePostScheduleMutation(() => handleToggleIsUpdate());

  const handleOnToggle = () => {
    const convert = convertToSchedule(value, data.availableDates, data.startTime, data.endTime);

    postScheduleMutate(convert);
  };

  const formattedAvailableDates = ['', ...data.availableDates];

  return (
    <div>
      <table css={table} ref={ref}>
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
              <th css={[tableTexture, styledTh]}>
                {String(rowIndex + Number(data.startTime.slice(0, 2)) + ':00')}
              </th>
              {row.map((_, columnIndex) => (
                <TimeSlot
                  key={rowIndex + columnIndex}
                  isSelected={value[rowIndex][columnIndex]}
                  isUpdate={isUpdate}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div css={buttonContainer}>
        <Button text="등록하기" onClick={handleOnToggle} />
      </div>
    </div>
  );
}
