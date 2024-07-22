import { UpdateStateProvider } from '@contexts/updateStateProvider';

import TimePicker from '@components/Time/Picker';

import { getMeetingResponse } from '@apis/getMeeting';

import responseData from '@mocks/data.json';

import { title } from './MeetingTimePickPage.styles';

// import { useGetMeetingQuery } from 'stores/servers/meeting/queries';

export default function MeetingTimePickPage() {
  // TODO: 임시 데이터 설정, 추후에 msw로 연결 수정
  // const { data } = useGetMeetingQuery();

  const data = responseData.data as getMeetingResponse;

  return (
    <UpdateStateProvider>
      <div>
        <h1 css={title}>momo TimePicker</h1>
        {data && <TimePicker data={data} />}
      </div>
    </UpdateStateProvider>
  );
}
