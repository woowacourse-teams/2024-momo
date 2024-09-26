import { useContext } from 'react';
import { useParams } from 'react-router-dom';

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
}

export default function Picker({ availableDates }: PickerProps) {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;
  const { userName } = useContext(AuthContext).state;

  const { handleToggleIsTimePickerUpdate } = useContext(TimePickerUpdateStateContext);

  const { selectedDates, hasDate, handleSelectedDate } = useCalendarPick(uuid, userName);

  const { mutate: postScheduleMutate, isPending } = usePostScheduleMutation(() =>
    handleToggleIsTimePickerUpdate(),
  );

  // 백엔드에 날짜 데이터 보내주기 위해 임시로 generate함수 선언(@낙타)
  const generateScheduleTable = (dates: string[]) => {
    return dates.map((date) => {
      return {
        date,
        times: ['00:00'],
      };
    });
  };

  const handleOnToggle = () => {
    postScheduleMutate({ uuid, requestData: generateScheduleTable(selectedDates) });
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
          <Button size="full" variant="secondary" onClick={handleToggleIsTimePickerUpdate}>
            취소하기
          </Button>
          <Button size="full" variant="primary" onClick={handleOnToggle} isLoading={isPending}>
            등록하기
          </Button>
        </div>
      </footer>
    </>
  );
}
