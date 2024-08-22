import { useParams } from 'react-router-dom';

import MeetingTicket from '@pages/FixedMeetingTicketPage/components/MeetingTicket';

import { useGetConfirmedMeetingInfoQuery } from '@stores/servers/confirm/queries';

import { s_container } from './FixedMeetingTicketPage.styles';
import ActionButtonGroup from './components/ActionButtonGroup';

export default function FixedMeetingTicketPage() {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;
  const { data } = useGetConfirmedMeetingInfoQuery(uuid);

  if (!data) {
    return null;
  }

  return (
    <div css={s_container}>
      <MeetingTicket data={data} />
      <ActionButtonGroup uuid={uuid} data={data} />
    </div>
  );
}
