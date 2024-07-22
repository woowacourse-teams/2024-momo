import { useContext } from 'react';

import { UpdateStateContext } from '@contexts/updateStateProvider';

import TimePicker from '@components/Time/Picker';
import TimeViewer from '@components/Time/Viewer';

import { useGetMeetingQuery } from '@stores/servers/meeting/queries';

import { title } from './MeetingTimePickPage.styles';

export default function MeetingTimePickPage() {
  const { data } = useGetMeetingQuery();
  const { getUpdateState } = useContext(UpdateStateContext);

  return (
    <div>
      <h1 css={title}>momo TimePicker</h1>
      {data && getUpdateState() && <TimePicker data={data} />}
      {data && !getUpdateState() && <TimeViewer data={data} />}
    </div>
  );
}
