import type { GetConfirmedMeetingInfoResponse } from '@apis/meetings/confirms';

import MomoCharacter from '@assets/images/momoCharacter.svg';

import { s_characterWrapper, s_container } from './MeetingTicket.styles';
import TicketInfo from './TicketInfo';

export interface MeetingTicketProps {
  data: GetConfirmedMeetingInfoResponse;
}

export default function MeetingTicket({ data }: MeetingTicketProps) {
  return (
    <div css={s_container}>
      <div css={s_characterWrapper}>
        <MomoCharacter width={180} height={180} />
      </div>
      <TicketInfo data={data} />
    </div>
  );
}
