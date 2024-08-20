import MomoCharacter from '@assets/images/momoCharacter.svg';

import { s_characterWrapper, s_container } from './MeetingTicket.styles';
import TicketInfo from './TicketInfo';

export default function MeetingTicket() {
  return (
    <div css={s_container}>
      <div css={s_characterWrapper}>
        <MomoCharacter width={180} height={180} />
      </div>
      <TicketInfo />
    </div>
  );
}
