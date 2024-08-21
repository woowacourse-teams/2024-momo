import MeetingTicket from '@pages/FixedMeetingTicketPage/components/MeetingTicket';

import { s_container } from './FixedMeetingTicketPage.styles';
import ActionButtonGroup from './components/ActionButtonGroup';

export default function FixedMeetingTicketPage() {
  return (
    <div css={s_container}>
      <MeetingTicket />
      <ActionButtonGroup />
    </div>
  );
}
