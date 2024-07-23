import { useContext } from 'react';

import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import TimePicker from '@components/Time/Picker';
import TimeViewer from '@components/Time/Viewer';

import { useGetMeetingQuery } from '@stores/servers/meeting/queries';

import { titleStyle } from './MeetingTimePickPage.styles';

export default function MeetingTimePickPage() {
  const { data } = useGetMeetingQuery();
  const { isTimePickerUpdate } = useContext(TimePickerUpdateStateContext);

  return (
    <div>
      <h1 css={titleStyle}>momo TimePicker</h1>
      {data && isTimePickerUpdate && <TimePicker data={data} />}
      {data && !isTimePickerUpdate && <TimeViewer data={data} />}
    </div>
  );
}
