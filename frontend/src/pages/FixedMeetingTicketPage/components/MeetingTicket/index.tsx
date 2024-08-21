import { useParams } from 'react-router-dom';

import { useCancelFixedMeetingMutation } from '@stores/servers/confirm/mutations';

import MomoCharacter from '@assets/images/momoCharacter.svg';

import { s_characterWrapper, s_container } from './MeetingTicket.styles';
import TicketInfo from './TicketInfo';

export default function MeetingTicket() {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const { mutate: cancelFixedMeeting } = useCancelFixedMeetingMutation(uuid);

  const handleCancelFixedMeetingButton = () => {
    const answer = confirm('약속 확정을 취소하시겠습니까?');

    if (answer) {
      cancelFixedMeeting();
    }
  };

  return (
    <div css={s_container}>
      <div css={s_characterWrapper}>
        <MomoCharacter width={180} height={180} />
      </div>
      <TicketInfo />
      {/* TODO: @Yoonkyoungme 버튼 영역을 컴포넌트로 분리 MeetingActionButtons */}
      <button onClick={() => handleCancelFixedMeetingButton()}>취소하기</button>
    </div>
  );
}
