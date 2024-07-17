import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useTimePick from '../../hooks/useTimePick/useTimePick';
import Button from '../_common/Button';
import postSchedule from '../../apis/postSchedule';
import { convertToSchedule, generateScheduleMatrix } from './TimePicker.utils';
import { buttonContainer, styledTd, styledTh, table, tableTexture } from './TimePicker.styles';

interface Schedules {
  date: string;
  times: string[];
}

export interface TimePickerProps {
  startTime: string;
  endTime: string;
  availableDates: string[];
  schedules: Schedules[];
}

export default function TimePicker({
  startTime,
  endTime,
  availableDates,
  schedules,
}: TimePickerProps) {
  const mutation = useMutation({
    mutationFn: postSchedule,
  });

  const formattedAvailableDates = ['', ...availableDates];
  const [isUpdate, setIsUpdate] = useState(false);

  const initialValue = generateScheduleMatrix({ startTime, endTime, availableDates, schedules });

  const [ref, value] = useTimePick(isUpdate, initialValue);

  const onToggle = () => {
    setIsUpdate((prevIsUpdate) => !prevIsUpdate);

    if (isUpdate) {
      const convert = convertToSchedule(value, availableDates, startTime, endTime);
      mutation.mutate(convert);
    }
  };

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

      <div css={buttonContainer}>
        <Button text={isUpdate ? '등록하기' : '수정하기'} onClick={onToggle} />
      </div>
    </div>
  );
}

export function Test() {
  return <></>;
}
