import { useContext } from 'react';

import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import TimePicker from '@components/Time/Picker';
import TimeViewer from '@components/Time/Viewer';

import { useGetMeetingQuery } from '@stores/servers/meeting/queries';

import { titleStyle } from './MeetingTimePickPage.styles';

export default function MeetingTimePickPage() {
  const { data } = useGetMeetingQuery();
  const { isTimePickerUpdate } = useContext(TimePickerUpdateStateContext);

  if (!data) return null;

  return (
    <div>
      <h1 css={titleStyle}>momo TimePicker</h1>
      {isTimePickerUpdate ? <TimePicker data={data} /> : <TimeViewer data={data} />}
    </div>
  );
}
