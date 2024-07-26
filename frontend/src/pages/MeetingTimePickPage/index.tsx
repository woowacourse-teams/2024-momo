import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import TimePicker from '@components/Time/Picker';
import TimeViewer from '@components/Time/Viewer';

import { useGetMeetingQuery } from '@stores/servers/meeting/queries';

import { s_title } from './MeetingTimePickPage.styles';

export default function MeetingTimePickPage() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const uuid = pathSegments[pathSegments.length - 1];

  const { data } = useGetMeetingQuery(uuid);
  const { isTimePickerUpdate } = useContext(TimePickerUpdateStateContext);

  if (!data) return null;

  return (
    <div>
      <h1 css={s_title}>momo TimePicker</h1>
      {isTimePickerUpdate ? <TimePicker data={data} /> : <TimeViewer data={data} />}
    </div>
  );
}
