import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import type { MeetingDateTime } from 'types/meeting';
import type { MeetingSingleSchedule } from 'types/schedule';

import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import ScheduleTimeList from '@components/Schedules/ScheduleTableFrame/ScheduleTimeList';
import { Button } from '@components/_common/Buttons/Button';

import usePagedTimePick from '@hooks/usePagedTimePick/usePagedTimePick';

import { usePostScheduleMutation } from '@stores/servers/schedule/mutations';

import ScheduleDateDayList from '../ScheduleTableFrame/ScheduleDateDayList';
import {
  s_baseTimeCell,
  s_buttonContainer,
  s_cellColorBySelected,
  s_datesControlButton,
  s_datesControlButtonContainer,
  s_relativeContainer,
  s_scheduleTable,
  s_scheduleTableBody,
  s_scheduleTableContainer,
  s_scheduleTableRow,
} from '../Schedules.styles';
import { convertToSchedule, generateSingleScheduleTable } from '../Schedules.util';

interface SchedulePickerProps extends MeetingDateTime {
  meetingSingleSchedule: MeetingSingleSchedule;
}

export default function SchedulePicker({
  firstTime,
  lastTime,
  availableDates,
  meetingSingleSchedule,
}: SchedulePickerProps) {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const { handleToggleIsTimePickerUpdate } = useContext(TimePickerUpdateStateContext);

  const schedules = generateSingleScheduleTable({
    firstTime,
    lastTime,
    availableDates,
    meetingSingleSchedule,
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
    <div css={s_relativeContainer}>
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
      <section css={s_scheduleTableContainer}>
        <ScheduleTimeList firstTime={firstTime} lastTime={lastTime} />
        <table css={s_scheduleTable} ref={tableRef} aria-label="약속 시간 수정 테이블">
          <thead>
            <ScheduleDateDayList availableDates={currentDates} />
          </thead>
          <tbody css={s_scheduleTableBody}>
            {currentTableValue.map((row, rowIndex) => (
              <tr key={rowIndex} css={s_scheduleTableRow}>
                {row.map((isSelected, columnIndex) => {
                  const isHalfHour = rowIndex % 2 !== 0;
                  const isLastRow = rowIndex === schedules.length - 1;

                  return (
                    <td
                      key={columnIndex}
                      css={[
                        s_baseTimeCell(isHalfHour, isLastRow),
                        s_cellColorBySelected(isSelected),
                      ]}
                    ></td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div css={s_buttonContainer}>
        <Button onClick={handleOnToggle} size="m" variant="primary">
          등록하기
        </Button>
      </div>
    </div>
  );
}
