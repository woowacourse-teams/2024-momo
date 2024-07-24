import { useContext } from 'react';

import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import Button from '@components/_common/Button';
import TimeSlot from '@components/_common/TimeSlot';

import type { GetMeetingResponse } from '@apis/getMeeting';

import { generateScheduleMatrix } from '../Picker/TimePicker.util';
import { s_buttonContainer, s_cell, s_table, s_th } from '../Time.styles';

interface TimeViewerProps {
  data: GetMeetingResponse;
}

export default function TimeViewer({ data }: TimeViewerProps) {
  const { isTimePickerUpdate, handleToggleIsTimePickerUpdate } = useContext(
    TimePickerUpdateStateContext,
  );

  const schedules = generateScheduleMatrix(data);

  const formattedAvailableDates = ['', ...data.availableDates];

  return (
    <div>
      <table css={s_table}>
        <thead>
          <tr>
            {formattedAvailableDates.map((date) => (
              <th key={date}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schedules.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th css={[s_cell, s_th]}>
                {String(rowIndex + Number(data.startTime.slice(0, 2)) + ':00')}
              </th>
              {row.map((_, columnIndex) => (
                <TimeSlot
                  key={rowIndex + columnIndex}
                  isSelected={schedules[rowIndex][columnIndex]}
                  isUpdate={isTimePickerUpdate}
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
