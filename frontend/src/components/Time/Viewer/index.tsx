import { useContext } from 'react';

import { UpdateStateContext } from '@contexts/updateStateProvider';

import Button from '@components/_common/Button';
import TimeSlot from '@components/_common/TimeSlot';

import { getMeetingResponse } from '@apis/getMeeting';

import { generateScheduleMatrix } from '../Picker/TimePicker.util';
import { buttonContainer, styledTh, table, tableTexture } from '../Time.styles';

interface TimeViewerProps {
  data: getMeetingResponse;
}

export default function TimeViewer({ data }: TimeViewerProps) {
  const { getUpdateState, handleToggleIsUpdate } = useContext(UpdateStateContext);

  const isUpdate = getUpdateState();

  const schedules = generateScheduleMatrix(data);
  const formattedAvailableDates = ['', ...data.availableDates];

  return (
    <div>
      <table css={table}>
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
              <th css={[tableTexture, styledTh]}>
                {String(rowIndex + Number(data.startTime.slice(0, 2)) + ':00')}
              </th>
              {row.map((_, columnIndex) => (
                <TimeSlot
                  key={rowIndex + columnIndex}
                  isSelected={schedules[rowIndex][columnIndex]}
                  isUpdate={isUpdate}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div css={buttonContainer}>
        <Button text="수정하기" onClick={handleToggleIsUpdate} />
      </div>
    </div>
  );
}
