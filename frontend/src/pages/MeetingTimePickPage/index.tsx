import { useState } from 'react';
import { usePostScheduleMutation } from 'stores/servers/meeting/mutations';

import TimePicker from '@components/TimePicker';
import Button from '@components/_common/Button';

import useTimePick from '@hooks/useTimePick/useTimePick';

import { getMeetingResponse } from '@apis/getMeeting';

import responseData from '@mocks/data.json';

import { buttonContainer, title } from './MeetingTimePickPage.styles';
import { convertToSchedule, generateScheduleMatrix } from './MeetingTimePickPage.utils';

// import { useGetMeetingQuery } from 'stores/servers/meeting/queries';

export default function MeetingTimePickPage() {
  // TODO: 임시 데이터 설정, 추후에 msw로 연결 수정
  // const { data } = useGetMeetingQuery();

  const data = responseData.data as getMeetingResponse;
  const initialValue = generateScheduleMatrix(data);
  const [isUpdate, setIsUpdate] = useState(false);
  const [ref, value] = useTimePick(isUpdate, initialValue);

  const { mutate: postScheduleMutate } = usePostScheduleMutation();

  const onToggle = () => {
    setIsUpdate((prevIsUpdate) => !prevIsUpdate);

    if (isUpdate) {
      const convert = convertToSchedule(value, data.availableDates, data.startTime, data.endTime);

      postScheduleMutate(convert);
    }
  };

  return (
    <div>
      <h1 css={title}>momo TimePicker</h1>
      {data && (
        <TimePicker
          isUpdate={isUpdate}
          availableDates={data.availableDates}
          startTime={data.startTime}
          useTimePickReturn={[ref, value]}
        />
      )}

      <div css={buttonContainer}>
        <Button text={isUpdate ? '등록하기' : '수정하기'} onClick={onToggle} />
      </div>
    </div>
  );
}
