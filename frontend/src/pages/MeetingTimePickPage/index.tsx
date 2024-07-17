import { useQuery } from '@tanstack/react-query';

import TimePicker from '@components/TimePicker';

import getMeeting from '@apis/getMeeting';

import { title } from './MeetingTimePickPage.styles';

export default function MeetingTimePickPage() {
  const { data } = useQuery({
    queryKey: ['getMeeting'],
    queryFn: () => getMeeting(),
    retry: 1,
  });

  return (
    <div>
      <h1 css={title}>momo TimePicker</h1>
      {data && <TimePicker {...data} />}
    </div>
  );
}
