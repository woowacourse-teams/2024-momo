import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import TimePicker from '@components/TimePicker';
import Button from '@components/_common/Button';

import useTimePick from '@hooks/useTimePick/useTimePick';

import { getMeetingResponse } from '@apis/getMeeting';
import postSchedule from '@apis/postSchedule';

import responseData from '@mocks/data.json';

import { buttonContainer, title } from './MeetingTimePickPage.styles';
import { convertToSchedule, generateScheduleMatrix } from './MeetingTimePickPage.utils';

export default function MeetingTimePickPage() {
  // TODO: 임시 데이터 설정, 추후에 msw로 연결 수정
  // const { data } = useQuery({
  //   queryKey: ['getMeeting'],
  //   queryFn: () => getMeeting(),
  //   retry: 1,
  // });

  const data = responseData.data as getMeetingResponse;
  const initialValue = generateScheduleMatrix(data);
  const [isUpdate, setIsUpdate] = useState(false);
  const [ref, value] = useTimePick(isUpdate, initialValue);

  const mutation = useMutation({
    mutationFn: postSchedule,
  });

  const onToggle = () => {
    setIsUpdate((prevIsUpdate) => !prevIsUpdate);

    if (isUpdate) {
      const convert = convertToSchedule(value, data.availableDates, data.startTime, data.endTime);

      mutation.mutate(convert);
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
