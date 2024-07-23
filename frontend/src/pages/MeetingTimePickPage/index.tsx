import { useContext } from 'react';

import { UpdateStateContext } from '@contexts/updateStateProvider';

import TimePicker from '@components/Time/Picker';
import TimeViewer from '@components/Time/Viewer';

import { useGetMeetingQuery } from '@stores/servers/meeting/queries';

import { title } from './MeetingTimePickPage.styles';

export default function MeetingTimePickPage() {
  const { data } = useGetMeetingQuery();
  const { isUpdate } = useContext(UpdateStateContext);

  return (
    <div>
      <h1 css={title}>momo TimePicker</h1>
      {data && isUpdate && <TimePicker data={data} />}
      {data && !isUpdate && <TimeViewer data={data} />}
    </div>
  );
}
