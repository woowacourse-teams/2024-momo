import type { MeetingAllSchedulesItem } from 'types/schedule';

import Calendar from '@components/_common/Calendar';

import { getFullDate } from '@utils/date';

import Header from './Header/Header';
import SingleDate from './SingleDate/SingleDate';
import SingleDateViewer from './SingleDate/SingleDateViewer';
import WeekDays from './WeekDays';

interface MeetingConfirmCalendarProps {
  schedules: MeetingAllSchedulesItem[];
  isTimePickerUpdate: boolean;
  handleSelectedDate: (date: string) => void;
  hasDate: (date: string) => boolean;
}

// WeekDays 컴포넌트는 바뀌지 않을 컴포넌트 같아서 나중에 Calendar 컴포넌트로 끌어올려도 좋을 것 같습니다(@낙타)
export default function MeetingConfirmCalendar({
  isTimePickerUpdate,
  schedules,
  hasDate,
  handleSelectedDate,
}: MeetingConfirmCalendarProps) {
  // 최적화 할 수 있다면 해당 로직을 어떻게 해볼 수 있을까요? useCallback을 사용해야할까요?
  // 해당 날짜가 활성화 되어있는지 판별하는 로직입니다. 활성화되지 않았다면 undefined를 반환하고
  // 활성화되었다면 해당 날짜를 선택한 인원을 확인할 수 있습니다.(@낙타)
  const availableDateInfo = (date: Date) => {
    return schedules.find((ele) => ele.date === getFullDate(date));
  };

  return (
    <Calendar>
      <Calendar.Header render={(props) => <Header {...props} />} />
      <Calendar.WeekDays render={(weekdays) => <WeekDays weekdays={weekdays} />} />
      <Calendar.Body
        renderDate={(dateInfo, today) =>
          isTimePickerUpdate ? (
            <SingleDate
              key={dateInfo.key}
              availableDateInfo={availableDateInfo(dateInfo.value)}
              dateInfo={dateInfo}
              today={today}
              hasDate={hasDate}
              onDateClick={handleSelectedDate}
            />
          ) : (
            <SingleDateViewer
              key={dateInfo.key}
              availableDateInfo={availableDateInfo(dateInfo.value)}
              dateInfo={dateInfo}
              today={today}
              hasDate={hasDate}
            />
          )
        }
      />
    </Calendar>
  );
}
