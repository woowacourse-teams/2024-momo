import { useContext, useMemo } from 'react';

import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import Button from '@components/_common/Button';
import TimeSlot from '@components/_common/TimeSlot';

import useTimePick from '@hooks/useTimePick/useTimePick';

import type { GetMeetingResponse } from '@apis/getMeeting';

import { usePostScheduleMutation } from '@stores/servers/meeting/mutations';

import { buttonContainer, cellStyle, tableStyle, thStyle } from '../Time.styles';
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
      <table css={tableStyle} ref={ref}>
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
              <th css={[cellStyle, thStyle]}>
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

      <div css={buttonContainer}>
        <Button text="등록하기" onClick={handleOnToggle} />
      </div>
    </div>
  );
}
