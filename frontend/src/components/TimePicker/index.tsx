import useTimePick from '@hooks/useTimePick/useTimePick';

import { styledTd, styledTh, table, tableTexture } from './TimePicker.styles';

export interface TimePickerProps {
  availableDates: string[];
  startTime: string;
  useTimePickReturn: ReturnType<typeof useTimePick>;
}

export default function TimePicker({
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
                <td
                  key={rowIndex + columnIndex}
                  css={[tableTexture, styledTd(value[rowIndex][columnIndex])]}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
