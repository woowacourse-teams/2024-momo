import { useContext } from 'react';
import type { Mode } from 'types/schedule';

import { AuthContext } from '@contexts/AuthProvider';
import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import {
  s_bottomFixedButtonContainer,
  s_fullButtonContainer,
} from '@components/Schedules/Schedules.styles';
import { Button } from '@components/_common/Buttons/Button';
import Calendar from '@components/_common/Calendar';

import useCalendarPick from '@hooks/useCalendarPick/useCalendarPick';
import useRouter from '@hooks/useRouter/useRouter';
import useUuid from '@hooks/useUuid/useUuid';

import { usePostScheduleByMode } from '@stores/servers/schedule/mutations';

import { getFullDate } from '@utils/date';

import Header from '../Header/Header';
import SingleDate from '../SingleDate/SingleDate';
import WeekDays from '../WeekDays';

interface PickerProps {
  availableDates: string[];
  mode: Mode;
}

export default function Picker({ availableDates, mode }: PickerProps) {
  const { routeTo } = useRouter();
  const { uuid } = useUuid();

  const { userName } = useContext(AuthContext).state;
  const { handleToggleIsTimePickerUpdate } = useContext(TimePickerUpdateStateContext);

  const { selectedDates, hasDate, handleSelectedDate } = useCalendarPick(uuid, userName);

  const { submitSchedule, isEditModePending, isRegisterModePending } = usePostScheduleByMode(mode);

  const convertSelectedDatesToRequest = (dates: string[]) => {
    const convertedData = dates.map((date) => {
      return {
        date,
        times: ['00:00'],
      };
    });

    return { uuid, requestData: convertedData };
  };

  const handleScheduleSave = () => {
    if (mode === 'register' && selectedDates.length === 0) {
      return;
    }

    const scheduleRequestData = convertSelectedDatesToRequest(selectedDates);
    submitSchedule(scheduleRequestData);
  };

  const isScheduleEmpty = selectedDates.length === 0;

  return (
    <>
      <Calendar>
        <Calendar.Header render={(props) => <Header {...props} />} />
        <Calendar.WeekDays render={(weekdays) => <WeekDays weekdays={weekdays} />} />
        <Calendar.Body
          renderDate={(dateInfo, today) => (
            <SingleDate
              key={dateInfo.key}
              isAvailable={availableDates.includes(getFullDate(dateInfo.value))}
              dateInfo={dateInfo}
              today={today}
              hasDate={hasDate}
              onDateClick={handleSelectedDate}
            />
          )}
        />
      </Calendar>

      <footer css={s_bottomFixedButtonContainer}>
        <div css={s_fullButtonContainer}>
          {mode === 'register' ? (
            <>
              <Button
                size="full"
                variant="secondary"
                onClick={() => routeTo(`/meeting/${uuid}/viewer`)}
              >
                약속 현황 조회
              </Button>
              <Button
                size="full"
                variant="primary"
                onClick={handleScheduleSave}
                isLoading={isRegisterModePending}
                disabled={isScheduleEmpty}
              >
                등록하기
              </Button>
            </>
          ) : (
            <>
              <Button size="full" variant="secondary" onClick={handleToggleIsTimePickerUpdate}>
                취소하기
              </Button>
              <Button
                size="full"
                variant="primary"
                onClick={handleScheduleSave}
                isLoading={isEditModePending}
              >
                수정하기
              </Button>
            </>
          )}
        </div>
      </footer>
    </>
  );
}
