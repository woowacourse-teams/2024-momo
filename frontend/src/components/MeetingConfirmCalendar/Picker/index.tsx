import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

import { usePostScheduleMutation } from '@stores/servers/schedule/mutations';

import { getFullDate } from '@utils/date';

import Header from '../Header/Header';
import SingleDate from '../SingleDate/SingleDate';
import WeekDays from '../WeekDays';

interface PickerProps {
  availableDates: string[];
  mode: Mode;
}

export default function Picker({ availableDates, mode }: PickerProps) {
  const navigate = useNavigate();

  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const { userName } = useContext(AuthContext).state;
  const { handleToggleIsTimePickerUpdate } = useContext(TimePickerUpdateStateContext);

  const { selectedDates, hasDate, handleSelectedDate } = useCalendarPick(uuid, userName);

  const { mutate: postScheduleMutateForEdit, isPending: isEditModePending } =
    usePostScheduleMutation(() => handleToggleIsTimePickerUpdate());

  const { mutate: postScheduleMutateForRegistration, isPending: isRegisterModePending } =
    usePostScheduleMutation(() => handleMeetingViewerNavigate());

  const generateScheduleTable = (dates: string[]) => {
    return dates.map((date) => {
      return {
        date,
        times: ['00:00'],
      };
    });
  };

  const handleMeetingViewerNavigate = () => {
    navigate(`/meeting/${uuid}/viewer`);
  };

  const handleScheduleSave = (mode: Mode) => {
    if (mode === 'register' && selectedDates.length === 0) {
      return;
    }

    const convertedData = generateScheduleTable(selectedDates);
    const scheduleRequestData = { uuid, requestData: convertedData };

    mode === 'register'
      ? postScheduleMutateForRegistration(scheduleRequestData)
      : postScheduleMutateForEdit(scheduleRequestData);
  };

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
              <Button size="full" variant="secondary" onClick={handleMeetingViewerNavigate}>
                약속 현황 조회
              </Button>
              <Button
                size="full"
                variant="primary"
                onClick={() => handleScheduleSave('register')}
                isLoading={isRegisterModePending}
                disabled={selectedDates.length === 0}
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
                onClick={() => handleScheduleSave('edit')}
                isLoading={isEditModePending}
              >
                등록하기
              </Button>
            </>
          )}
        </div>
      </footer>
    </>
  );
}
