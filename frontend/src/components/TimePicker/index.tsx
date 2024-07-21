import TimeSlot from '@components/_common/TimeSlot';

import useTimePick from '@hooks/useTimePick/useTimePick';

import { styledTh, table, tableTexture } from './TimePicker.styles';

export interface TimePickerProps {
  isUpdate: boolean;
  availableDates: string[];
  startTime: string;
  useTimePickReturn: ReturnType<typeof useTimePick>;
}

export default function TimePicker({
  isUpdate,
  availableDates,
  startTime,
  useTimePickReturn,
}: TimePickerProps) {
  const [ref, value] = useTimePickReturn;
  const formattedAvailableDates = ['', ...availableDates];

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
                {String(rowIndex + Number(startTime.slice(0, 2)) + ':00')}
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
    </div>
  );
}
